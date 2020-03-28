'use strict';
const AWSMock = require('aws-sdk-mock');

describe('Details a task', () => {
    AWSMock.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
        if (params.Key.id === 1)
            callback(null, {
                Item: {
                    id: 1,
                    title: 'Whatch 6th season of B99',
                    done: false
                }
            });
        callback(null, { Item: null });
    });

    const main = require('./main');

    describe('Should find a task', () => {
        let response;
        beforeAll(async () => {
            const pathParameters = { id: 1 };
            response = await main.lambdaHandler({ pathParameters });
        });

        test('should return expected task', async () => {
            const expectedTask = {
                id: 1,
                title: 'Whatch 6th season of B99',
                done: false
            };
            const data = JSON.parse(response.body).data;
            expect(data).toStrictEqual(expectedTask);
        });

        test('should have status code 200', () => {
            expect(response.statusCode).toBe(200);
        });
    });

    describe('With id 4', () => {
        let response;
        beforeAll(async () => {
            const pathParameters = { id: 4 };
            response = await main.lambdaHandler({ pathParameters });
        });

        test('should have status code 404', () => {
            expect(response.statusCode).toBe(404);
        });

        test('should contain error message', () => {
            expect(JSON.parse(response.body).payload.message).toBe('Task not found');
        });
    });
});
