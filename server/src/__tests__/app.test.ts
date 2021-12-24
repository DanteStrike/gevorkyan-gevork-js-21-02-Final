import request from 'supertest';
import app from '../app';

describe(`app should work correctly`, () => {
  it(`headers test`, async () => {
    const response = await request(app).get('/any');
    expect(response.headers).toMatchObject({
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST, PUT, OPTIONS',
      'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept',
    });
  });
});
