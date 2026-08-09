const request = require('supertest');
const app = require('./app');

describe('POST /links', () => {
  test('creates a shortened link', async () => {
    const res = await request(app).post('/links').send({ url: 'https://example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body.code).toBeDefined();
  });

  test('returns 400 if url is missing', async () => {
    const res = await request(app).post('/links').send({});
    expect(res.statusCode).toBe(400);
  });
});

describe('GET /links/:code', () => {
  test('returns 404 for an unknown code', async () => {
    const res = await request(app).get('/links/doesnotexist');
    expect(res.statusCode).toBe(404);
  });
});
