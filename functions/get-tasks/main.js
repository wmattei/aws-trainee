const AWS = require('aws-sdk');

const awsOptions = { endpoint: process.env.AWS_SAM_LOCAL === 'true' ? 'http://dynamodb:8000' : null };
const dynamo = new AWS.DynamoDB.DocumentClient(awsOptions);

const TABLE_NAME = 'tasks';

exports.lambdaHandler = async () => {
    let response;
    try {
        const dbResponse = await dynamo
            .scan({
                TableName: TABLE_NAME
            })
            .promise();

        response = {
            statusCode: 200,
            body: JSON.stringify({
                data: dbResponse.Items
            })
        };
    } catch (err) {
        console.error(err);
        return err;
    }

    return response;
};
