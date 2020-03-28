const AWS = require('aws-sdk');
const awsOptions = { endpoint: process.env.AWS_SAM_LOCAL === 'true' ? 'http://dynamodb:8000' : null };
const dynamo = new AWS.DynamoDB.DocumentClient(awsOptions);

const TABLE_NAME = 'tasks';

exports.lambdaHandler = async event => {
    let response;
    try {
        const dbResponse = await dynamo
            .get({
                TableName: TABLE_NAME,
                Key: { Id: event.pathParameters.id }
            })
            .promise();
        if (!dbResponse.Item) {
            const Boom = require('boom');
            response = {
                body: JSON.stringify(Boom.notFound('Task not found').output),
                statusCode: 404
            };
        } else {
            response = {
                statusCode: 200,
                body: JSON.stringify({
                    data: dbResponse.Item
                })
            };
        }
    } catch (err) {
        console.error(err);
        return err;
    }

    return response;
};
