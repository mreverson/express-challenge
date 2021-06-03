const request = require('supertest');
const app = require('../app');
const handleErrors = require('../middleware/handleErrors');

jest.setTimeout(10000);

// TEST: /save-book-list Error Case: Book List Empty
describe("PUT Endpoint", () => {
    test('Should Throw Error for Empty List', () => {
        app.use(handleErrors);
        return request(app)
            .put('/save-book-list')
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body).toHaveProperty('message');
            });
    });
});

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

// TEST: /add-book success case
describe("Post Endpoint", () => {
    test('Should Add book to List', () => {
        return request(app)
            .post('/add-book')
            .send({
                book: 'test book 2'
            })
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('data');
            });
    });
});

// TEST: /add-book success case
describe("Post Endpoint", () => {
    test('Should Add book to List', () => {
        return request(app)
            .post('/add-book')
            .send({
                book: 'test book 3'
            })
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('data');
            });
    });
});

// TEST: /save-book-list success case
describe("PUT Endpoint", () => {
    test('Should Get/Return full booklist', async () => {
        return await request(app)
            .put('/save-book-list')
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('data');
            });
    });
});



