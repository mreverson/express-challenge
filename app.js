const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const {BadRequest} = require('./utils/errors');

// parsing middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Memory
var library = [];

// HELPERS

const findIfExists = (title) => {
    var val = library.indexOf(title)
    return val;
}

const saveItemOnDatabase = (name, callback) => {
    var nameInt = name.length;
    var saveTime = parseInt((nameInt * Math.random()) * 500);
    
    var inter = setInterval(function() {
            callback(name, saveTime , inter)
        }, saveTime);
    
    inter;

}

const getBookList = (list, index, callback, oldString) => {
    
    var finalString = callback(' | ', list[index], oldString);
    
    if(index == (list.length - 1)){
        //return string
        return finalString;

    } else {
        // recursive call
        return getBookList(list, index + 1, callback, finalString);
    }
}

// -------- API METHODS --------- //
// Post: Add book to array
app.post('/add-book', (req, res) => {
    var book = req.body.book.trim();
    var dupe = findIfExists(book);

    if(!book){

        throw new BadRequest("Please enter a title");

    } else if (dupe != -1) {

        throw new BadRequest("Book Already Exists");

    } else {

        library.push(book);
        res.json({
            message: 'Book Successfully Added',
            data: library
        });
    }
    
});

// Delete: Remove book from array
app.delete('/remove-book', (req, res) => {

    //change status to 204
    var book = req.body.book.trim();
    var toDelete = findIfExists(book);

    if(!book){
        throw new BadRequest("Please Enter a title to remove");
    } 
    if (toDelete == -1) {
        throw new BadRequest("Book Doesn't Exist");
    } 

    library = library.filter(item => item !== book);

    res.json({
        message: 'Book Successfully Removed',
        data: library
    });
    
});

// Patch: update name of existing book
app.patch('/update-book', (req, res) => {
    var original_book = req.body.original_book.trim();
    var new_book = req.body.new_book.trim();

    var originalBookExists = findIfExists(original_book);
    var newBookExists = findIfExists(new_book);

    if(!original_book || !new_book){
        throw new BadRequest("Both Existing Title & New Title Are Required");
    } 

    if (original_book === new_book) {
        throw new BadRequest("Cannot change to same Name");
    }

    if(originalBookExists == -1){
        throw new BadRequest(`Error: Book ${original_book} Doesn't Exist`);
    }  

    if(newBookExists != -1){
        throw new BadRequest(`Error: Book ${new_book} Already Exists`);
    }

    original = JSON.stringify(library);

    library = JSON.parse(original.replace(original_book, new_book));

    res.json({
        message: 'Book Title Updated Successfully',
        data: library
    });
    
});

// Get: pull all books in the list
app.get('/get-book-list', (req, res) => {
    var final = '';
    
    var callback = function(sep, string, old){
        var addString = '';
        addString = old.concat(string, sep);
        return addString;
    }

    if(library.length > 0){
        final = getBookList(library, 0, callback, '');

        res.json({
            data: final,
        });
    } else {
        throw new BadRequest("No Books Listed");
    }
});

// Put: Emulate save to DB
app.put('/save-book-list', (req, res) => {
    var saveData = {};
    var libLength = library.length;
    
    var callback = function(bookName, bookValue, inter){
        saveData[bookName] = bookValue;
        
        libLength = libLength - 1;
        clearInterval(inter);

        if(libLength == 0){
            res.json({
                message: 'Saved Successfully',
                data: saveData
            })
        }
    }

    if(library.length > 0) {
        library.forEach((book) => {
            saveItemOnDatabase(book, callback);
         })
    } else {
        throw new BadRequest("There are no Books to save");
    }
   
});

module.exports = app;