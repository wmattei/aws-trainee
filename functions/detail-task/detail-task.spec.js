'use strict';

const main = require('./main');

describe('Details a task', () => {
    describe('With id 1', () => {
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
