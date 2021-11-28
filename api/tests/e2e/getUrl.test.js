const request = require('supertest')
const app = require('../../src/app')
const UrlVisit = require('../../src/database/models/urlVisit');
const { testUrl, setupDatabase, seedData, disposeDatabase } = require('../fixtures/db');

beforeAll(setupDatabase);

beforeEach(seedData);

afterAll(disposeDatabase);

test('Should redirect to url by shourt id', async () => {
    const response = await request(app).get('/' + testUrl.id);
    expect(response.status).toEqual(302);
    expect(response.headers.location).toContain(testUrl.url);
});

test('Should return not found for unknown id', async () => {
    const response = await request(app).get('/aaa');
    expect(response.status).toEqual(404);
});

test('Should save visits', async () => {
    await request(app).get('/' + testUrl.id);
    await request(app).get('/' + testUrl.id);

    const visits = await UrlVisit.count();
    expect(visits).toBe(2);
});