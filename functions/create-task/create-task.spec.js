'use strict';
const fetch = require('node-fetch');

describe('Creates a new task', () => {
    describe('With all data passed', () => {
        const task = {
            title: 'New Treatment',
            done: false
        };
        let response;
        beforeAll(async () => {
            response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task)
            }).catch(console.error);
        });
        test('should return expected task', async () => {
            const savedTask = await response.json();

            expect(savedTask.data).toStrictEqual(task);
        });

        test('should have status code 201', () => {
            expect(response.status).toBe(201);
        });
    });
});
