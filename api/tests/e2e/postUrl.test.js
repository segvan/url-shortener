const request = require('supertest');
const app = require('../../src/app');
const Url = require('../../src/database/models/url');
const { setupDatabase, seedData, disposeDatabase } = require('../fixtures/db');

beforeAll(setupDatabase);

beforeEach(seedData);

afterAll(disposeDatabase);

test('Should validate empty url', async () => {
    const response = await request(app)
        .post('/shortUrl')
        .send({
            url: ''
        });

    expect(response.status).toEqual(400);
});

test('Should validate invalid url', async () => {
    const response = await request(app)
        .post('/shortUrl')
        .send({
            url: 'invalid'
        });

    expect(response.status).toEqual(400);
});

test('Should create short id', async () => {
    const response = await request(app)
        .post('/shortUrl')
        .send({
            url: 'http://test.net'
        });

    expect(response.status).toEqual(201);
});

test('Should save url with short id to database', async () => {
    const response = await request(app)
        .post('/shortUrl')
        .send({
            url: 'http://test.net'
        });

    const id = new URL(response.body.shortUrl).pathname.replace('/', '');
    const url = await Url.findByPk(id);
    
    expect(url).not.toBeNull();
    expect(url.url).toBe('http://test.net');
});