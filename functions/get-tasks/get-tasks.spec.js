'use strict';

const main = require('./main');

describe('Get tasks', () => {
    describe('without filters', () => {
        let response;
        beforeAll(async () => {
            response = await main.lambdaHandler({});
        });

        test('should contain length 3', async () => {
            const tasks = JSON.parse(response.body).data;
            expect(tasks.length).toBe(3);
        });

        test('should have status code 200', () => {
            expect(response.statusCode).toBe(200);
        });
    });
});
