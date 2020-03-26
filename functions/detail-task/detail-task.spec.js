'use strict';

const fetch = require('node-fetch');

describe('Details a task', () => {
    describe('With id 1', () => {
        let response;
        beforeAll(async () => {
            response = await fetch('http://localhost:3000/tasks/1').catch(
                console.error
            );
        });

        test('should return expected task', async () => {
            const expectedTask = {
                id: 1,
                title: 'Whatch 6th season of B99',
                done: false
            };
            const task = await response.json();
            expect(task.data).toStrictEqual(expectedTask);
        });

        test('should have status code 200', () => {
            expect(response.status).toBe(200);
        });
    });

    describe('With id 4', () => {
        let response;
        beforeAll(async () => {
            response = await fetch('http://localhost:3000/tasks/4').then(res =>
                res.json()
            );
        });

        test('should have status code 404', () => {
            expect(response.statusCode).toBe(404);
        });

        test('should containe error message', () => {
            expect(response.payload.message).toBe('Task not found');
        });
    });
});
