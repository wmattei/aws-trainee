'use strict';
const main = require('./main');

describe('Creates a new task', () => {
    describe('With all data passed', () => {
        const task = {
            title: 'New Treatment',
            done: false
        };
        let response;
        beforeAll(async () => {
            response = await main.lambdaHandler({ body: JSON.stringify(task) });
        });
        test('should return expected task', async () => {
            const savedTask = await JSON.parse(response.body).data;

            expect(savedTask).toStrictEqual(task);
        });

        test('should have status code 201', () => {
            expect(response.statusCode).toBe(201);
        });
    });
});
