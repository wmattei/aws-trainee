const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

const awsOptions = { endpoint: process.env.AWS_SAM_LOCAL === 'true' ? 'http://dynamodb:8000' : null };
const dynamo = new AWS.DynamoDB.DocumentClient(awsOptions);

const TABLE_NAME = 'tasks';

exports.lambdaHandler = async event => {
    let response;
    try {
        const task = { Id: uuidv4(), ...JSON.parse(event.body) };
        new AWS.DynamoDB.DocumentClient();
        await dynamo
            .put({
                TableName: TABLE_NAME,
                Item: task
            })
            .promise();

        response = {
            statusCode: 201,
            body: JSON.stringify({
                message: 'Created!',
                data: task
            })
        };
    } catch (err) {
        console.error(err);
        return err;
    }

    return response;
};
