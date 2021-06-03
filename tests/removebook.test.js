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

// TEST: /remove-book success case
describe("Delete Endpoint", () => {
    test('Should Remove book from List', () => {
        return request(app)
            .delete('/remove-book')
            .send({
                book: 'test book'
            })
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('data');
            });
    });
});

// TEST: /remove-book Error Case: Empty Entry
describe("Delete Endpoint", () => {
    test('Should Throw Error for Empty Entry', () => {
        app.use(handleErrors);
        
        return request(app)
            .delete('/remove-book')
            .send({
                book: ''
            })
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body).toHaveProperty('message');
        });
    });
});

// TEST: /remove-book Error Case: Entry Doesn't Exist
describe("Delete Endpoint", () => {
    test('Should Throw Error for Empty Entry', () => {
        app.use(handleErrors);
        
        return request(app)
            .delete('/remove-book')
            .send({
                book: 'Random Book'
            })
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body).toHaveProperty('message');
        });
    });
});