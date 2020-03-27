const AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'tasks';

module.exports.initializateDynamoClient = newDynamo => {
    dynamo = newDynamo;
};

exports.lambdaHandler = async () => {
    let response;
    try {
        const dbResponse = await dynamo.scan({
            TableName: TABLE_NAME
        }).promise();

    
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
