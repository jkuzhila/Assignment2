/* file name : Contact.js   James Kuzhilaparambil  301119040  10/18/2021*/


let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Contact = require('../models/contact');

module.exports.displayBookList = (req, res, next) => {
    Contact.find((err, bookList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);

            res.render('Contact/list', 
            {title: 'Contacts', 
            BookList: bookList, 
            displayName: req.user ? req.user.displayName : ''});      
        }
    }).sort({name:'asc'});
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('Contact/add', {title: 'Add Contact', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newBook = Contact({
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone
    });

    Contact.create(newBook, (err, Book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/Contact-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, bookToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('Contact/update', {title: 'Update Contact', contact: bookToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedBook = Contact({
        "_id": id,
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone
    });

    Contact.updateOne({_id: id}, updatedBook, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/Contact-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/Contact-list');
        }
    });
}