'use strict';
const AWSMock = require('aws-sdk-mock');

describe('Delete a task', () => {
    AWSMock.mock('DynamoDB.DocumentClient', 'delete', (params, callback) => {
        if (params.Key.Id === 1) callback(null, { Attributes: {} });
        callback(null, {});
    });

    const main = require('./main');

    describe('With valid id', () => {
        let response;
        beforeAll(async () => {
            const pathParameters = { id: 1 };
            response = await main.lambdaHandler({ pathParameters });
        });

        test('should return deleted message', async () => {
            const message = JSON.parse(response.body).message;
            expect(message).toBe('Deleted!');
        });

        test('should have status code 200', () => {
            expect(response.statusCode).toBe(200);
        });
    });

    describe('With wrong id', () => {
        let response;
        beforeAll(async () => {
            const pathParameters = { id: 2 };
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
