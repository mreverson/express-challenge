const request = require('supertest');
const app = require('../app');
const handleErrors = require('../middleware/handleErrors');

jest.setTimeout(10000);

// TEST: /add-book success case
describe("Post Endpoint", () => {
    test('Should Add book to List', () => {
        return request(app)
            .post('/add-book')
            .send({
                book: 'test book'
            })
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('data');
            });
    });
});

// TEST: /add-book Error Case: Duplicate Entry
describe("Post Endpoint", () => {
    test('Should Throw Error for Duplicate Entry', () => {
        
        app.use(handleErrors);

        return request(app)
            .post('/add-book')
            .send({
                book: 'test book'
            })
            .then(res => {
                console.log(res)
                expect(res.statusCode).toEqual(400);
                expect(res.body).toHaveProperty('message');
            });
    });
});


// TEST: /add-book Error Case: Empty Entry
describe("Post Endpoint", () => {
    test('Should Throw Error for Empty Entry', () => {
        app.use(handleErrors);

        return request(app)
            .post('/add-book')
            .send({
                book: ''
            })
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body).toHaveProperty('message');
            });
    });
});


