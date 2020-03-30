const AWS = require('aws-sdk');

const awsOptions = { endpoint: process.env.AWS_SAM_LOCAL === 'true' ? 'http://dynamodb:8000' : null };
const dynamo = new AWS.DynamoDB.DocumentClient(awsOptions);

const TABLE_NAME = 'tasks';

exports.lambdaHandler = async event => {
    let response;
    try {
        const task = JSON.parse(event.body);
        new AWS.DynamoDB.DocumentClient();
        const dbResponse = await dynamo
            .update({
                TableName: TABLE_NAME,
                Key: {
                    Id: event.pathParameters.id
                },
                UpdateExpression: 'SET #done = :done, #title = :title',
                ExpressionAttributeNames: {
                    '#title': 'title',
                    '#done': 'done'
                },
                ExpressionAttributeValues: {
                    ':title': task.title,
                    ':done': task.done
                },
                ReturnValues: 'ALL_NEW'
            })
            .promise();

        if (!dbResponse.Attributes) {
            const Boom = require('boom');
            response = {
                body: JSON.stringify(Boom.notFound('Task not found').output),
                statusCode: 404
            };
        } else {
            response = {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Updated!',
                    data: dbResponse.Attributes
                })
            };
        }
    } catch (err) {
        console.error(err);
        return err;
    }

    return response;
};
