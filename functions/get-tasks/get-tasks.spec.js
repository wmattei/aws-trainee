'use strict';
const AWSMock = require('aws-sdk-mock');

describe('Get tasks', () => {
    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
        callback(null, {
            Items: [
                {
                    id: 1,
                    title: 'Whatch 6th season of B99',
                    done: false
                },
                {
                    id: 2,
                    title: 'Bo back to the future',
                    done: false
                }
            ]
        });
    });

    const main = require('./main');

    describe('without filters', () => {
        let response;
        beforeAll(async () => {
            response = await main.lambdaHandler({});
        });

        test('should contain length 2', async () => {
            const tasks = JSON.parse(response.body).data;
            expect(tasks.length).toBe(2);
        });

        test('should have status code 200', () => {
            expect(response.statusCode).toBe(200);
        });
    });
});
