'use strict';
const AWSMock = require('aws-sdk-mock');

describe('Update a task', () => {
    AWSMock.mock('DynamoDB.DocumentClient', 'update', (params, callback) => {
        if (params.Key.Id === 1)
            callback(null, {
                Attributes: {
                    done: true,
                    title: 'Updated task'
                }
            });
        callback(null, {});
    });

    const main = require('./main');

    describe('With valid id', () => {
        let response;
        beforeAll(async () => {
            const pathParameters = { id: 1 };
            const body = JSON.stringify({
                done: true,
                title: 'Updated task'
            });

            response = await main.lambdaHandler({ pathParameters, body });
        });

        test('should return data', async () => {
            const data = JSON.parse(response.body).data;

            expect(data).toMatchObject({
                done: true,
                title: 'Updated task'
            });
        });

        test('should have status code 200', () => {
            expect(response.statusCode).toBe(200);
        });
    });

    describe('With wrong id', () => {
        let response;
        beforeAll(async () => {
            const pathParameters = { id: 2 };
            response = await main.lambdaHandler({ pathParameters, body: JSON.stringify({}) });
        });

        test('should have status code 404', () => {
            expect(response.statusCode).toBe(404);
        });

        test('should contain error message', () => {
            expect(JSON.parse(response.body).payload.message).toBe('Task not found');
        });
    });
});
