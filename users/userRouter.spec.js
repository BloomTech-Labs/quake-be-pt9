const server = require ('../../server');
const request = require('supertest');
const db = require('../../../data/dbConfig');


// describe('users route', ()=> {
//     beforeEach(async ()=> {
//         await db('users').truncate();
//     })
// })

// test('returns an object on get ', async ()=> {
//     const reg = await request(server)
//     .post('/api/users/register')
//     .send({
//         first_name: 'Tony',
//         last_name: 'Test',
//         password: 123,
//         email: 'someGuy@email.com'
//     })
// })


// test('it will let you post', async ()=> {
//     const reg = await request(server)
//     .post('/api/users/register')
//     .send({
//         first_name: 'Tony',
//         last_name: 'Test',
//         password: '123',
//         email: 'someGuy@email.com'
//     });
    
//     expect(reg.status).toBe(201)
// })

// // test('it will let you login', async ()=> {
// //     const reg = await request(server)
// //     .post('/api/users/register')
// //     .send({
// //         first_name: 'Tony',
// //         last_name: 'Test',
// //         password: '123',
// //         email: 'someGuy@email.com'
// //     })
// //     const login = await request(server)

// //     .post('api/users/login')
// //     .send({
// //         email: 'someGuy@email.com',
// //         password: '123'
// //     });
// //     expect (reg.status).toBe(201)
// // })

// it('should return a JSON object from the index route', async ()=> {
//     const expectedBody = { api: 'Quake Online!'};

//     const response = await request(server).get('/');

//     expect(response.body).toEqual(expectedBody)
// })


// // describe('Get/users', ()=> {
// //     it('should return a 200 status', ()=> {
// //         return request(server).get('api/users/all').expect(200)
// //     })

//     it('should return an array', async()=> {
//         const res = await db('users')

//         expect(res).toHaveLength(7);
//     })
// // })


// it ('should use json', async ()=> {
//     const res = await request(server).get('/api/users/all')

//     expect(res.type).toBe('application/json')
// })

// it("should not let you log in with bad credentials", async () => {
//     const res = await request(server)
//       .post("/api/users/login")
//       .send({
//         username: "testsuite",
//         password: "test"
//       });
//     expect(res.status).toBe(400);
//   });