const server = require('./server.js');
const request = require('supertest');

describe('server.js', () => {
  test('should be the testing env', () => {
      expect(process.env.DATABASE_URL).toBe('testing');
  });
});

describe('GET /', function() {
  it('should return 200 OK', function () {
      return request(server).get('/')
      .then( res => {
          expect(res.status).toBe(200);
      })
  });

  it('should return JSON', function () {
      return request(server).get('/')
      .then( res => {
          expect(res.body.message).toBe("Quake Online!")
      })
  });
});
