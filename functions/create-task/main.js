const AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'tasks';

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

module.exports.initializateDynamoClient = newDynamo => {
    dynamo = newDynamo;
};

exports.lambdaHandler = async event => {
    let response;
    try {
        const task = JSON.parse(event.body);

        await dynamo
            .put({
                TableName: TABLE_NAME,
                Item: { ...task, id: uuidv4() }
            })
            .promise();

        response = {
            statusCode: 201,
            body: JSON.stringify({
                message: 'Created!',
                data: { ...task, id: uuidv4() }
            })
        };
    } catch (err) {
        console.error(err);
        return err;
    }

    return response;
};
