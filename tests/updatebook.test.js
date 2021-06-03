const request = require('supertest');
const app = require('../app');
const handleErrors = require('../middleware/handleErrors');

jest.setTimeout(10000);

// TEST: /add-book Success Case
describe("Post Endpoint", () => {
    test('Should Add book to List', () => {
       return request(app)
        .post('/add-book')
        .send({
            book: 'this is book 1'
        })
        .then(res => {
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('data');
        });
    });
});

// TEST: /add-book Success Case
describe("Post Endpoint", () => {
    test('Should Add book to List', () => {
       return request(app)
        .post('/add-book')
        .send({
            book: 'this is book 2'
        })
        .then(res => {
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('data');
        });
    });
});

// TEST: /update-book Success Case
describe("Post Endpoint", () => {
    test('Should Add book to List', () => {
       return request(app)
        .patch('/update-book')
        .send({
            original_book: 'this is book 2',
            new_book: 'this is now book 3'
        })
        .then(res => {
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('data');
        });
    });
});

// TEST: /update-book Error Case: Both Entries Empty
describe("Patch Endpoint Error", () => {
    test('Should Throw Error for both Entries Empty', () => {
        app.use(handleErrors);

        return request(app)
            .patch('/update-book')
            .send({
                original_book: '',
                new_book: ''
            })
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body).toHaveProperty('message');
            });
    });
});

// TEST: /update-book Error Case: Original Book Empty
describe("Patch Endpoint Error", () => {
    test('Should Throw Error for Empty original_book', () => {
        app.use(handleErrors);

        return request(app)
            .patch('/update-book')
            .send({
                original_book: 'this is book 2',
                new_book: ''
            })
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body).toHaveProperty('message');
            });
    });
});

// TEST: /update-book Error Case: New Book Empty
describe("Patch Endpoint Error", () => {
    test('Should Throw Error for Empty new_book', () => {
        app.use(handleErrors);
        
        return request(app)
            .patch('/update-book')
            .send({
                original_book: '',
                new_book: 'this is now book 3'
            })
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body).toHaveProperty('message');
            });
    });
});

// TEST: /update-book Error Case: Changing to Same Name
describe("Patch Endpoint Error", () => {
    test('Should Throw Error for Trying to Change to the Same Name', () => {
        app.use(handleErrors);
        
        return request(app)
            .patch('/update-book')
            .send({
                original_book: 'this is book 2',
                new_book: 'this is book 2'
            })
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body).toHaveProperty('message');
            });
    });
});

// TEST: /update-book Error Case: Original Book Doesn't Exist
describe("Patch Endpoint Error", () => {
    test("Should Throw Error if original_book doesn't exist", () => {
        app.use(handleErrors);
        
        return request(app)
            .patch('/update-book')
            .send({
                original_book: 'does not exit',
                new_book: 'this is book 2'
            })
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body).toHaveProperty('message');
            });
    });
});

// TEST: /update-book Error Case: New Book Already Exists
describe("Patch Endpoint Error", () => {
    test("Should Throw Error if new_book already exists", () => {
        app.use(handleErrors);
        
        return request(app)
            .patch('/update-book')
            .send({
                original_book: 'this is book 2',
                new_book: 'this is book 1'
            })
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body).toHaveProperty('message');
            });
    });
});