const AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'tasks';

module.exports.initializateDynamoClient = newDynamo => {
    dynamo = newDynamo;
};

exports.lambdaHandler = async event => {
    let response;
    try {
        const dbResponse = await dynamo
            .get({
                TableName: TABLE_NAME,
                Key: { id: event.pathParameters.id }
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
