'use strict';

const fetch = require('node-fetch');

describe('Get tasks', () => {
    describe('without filters', () => {
        let response;
        beforeAll(async () => {
            response = await fetch('http://localhost:3000/tasks').catch(
                console.error
            );
        });

        test('should contain length 3', async () => {
            const task = await response.json();
            expect(task.data.length).toBe(3);
        });

        test('should have status code 200', () => {
            expect(response.status).toBe(200);
        });
    });

});
