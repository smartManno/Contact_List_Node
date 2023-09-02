const mongoose = require('mongoose');

// lets create schema in the databse
const contactSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
});

// creating model inside our database
// as in the code we have collection name contactList but in the database we will name diff

const Contact = mongoose.model('Contact', contactSchema);

// exporting this model inside our index.js
module.exports = Contact;