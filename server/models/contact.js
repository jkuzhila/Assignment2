/* file name : contact.js   James Kuzhilaparambil  301119040  10/18/2021*/

let mongoose = require('mongoose');

// create a model class
let contactModel = mongoose.Schema({
    name: String,
    email: String,
    phone: Number
},
{
    collection: "contacts"
});

module.exports = mongoose.model('Contact', contactModel);