const express = require('express');
const path = require('path');
const port = 8000;

/*
    By importing the db from mongoose.js in your index.js file, 
    you can use this database connection to interact with your MongoDB database 
    throughout your application. This centralizes the database connection logic 
    and makes it easier to manage and reuse in different parts of your application.

    it need to be just above the express server
*/
const db = require('./config/mongoose');

// this Contact will create entry in the database
const Contact = require('./models/contact');

const app = express();


app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname, 'views'));

// using our middleware or parser

app.use(express.urlencoded());

app.use(express.static('assets'));

/*
    // lets create our own middleware
    app.use(function(req, res, next){
        console.log("I am middleware 1");
        next();
    });

    app.use(function(req, res, next){
        console.log("I am middleware 2");
        next();
    })
 */
const contactList = [
    {
        name:"Manohar",
        phone: 123456789
    },
    {
        name: "Deepak",
        phone: 2233445566
    }
];

/*  this code is not working bcs callback function is depricated
app.get('/', function(req,res){

    Contact.find({},function(err, contacts){
        if(err) {
             console.log('Error in fetching contacts fro db');
             return;
        }

        return res.render('home', {
            title:'Contact List',
            contact_list: contactList
        });
    });
   
});
*/

app.get('/', async function(req, res) {
    try {
        const contacts = await Contact.find({});
        return res.render('home', {
            title: 'Contact List',
            contact_list: contacts
        });
    } catch (err) {
        console.log('Error in fetching contacts from the database:', err);
        // Handle the error and send an appropriate response if needed.
        // For example: return res.status(500).send('Internal Server Error');
    }
});
app.get('/contact', function(req,res){
    res.render('contact',{
        title:'Let us play with ejs',
       
    });
});



// creating a controller to append the contact details to practic 

app.post('/create-contact', async function(req, res){
    // contactList.push({
    //     name:req.body.name,
    //     phone: req.body.phone
    // })
    // return res.redirect('/')

    // -------new  code to add data in db
    /*
    Contact.create({
        name:req.body.name,
        phone: req.body.phone
    }, function(err,newContact){
        if(err){
            console.log('error while saving the contact', err);
            return;
        }
        console.log("***** Newly created contact! *******", newContact);
        return res.redirect('/');
    }) */

    try {
        const newContact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone
        });
    
        console.log("***** Newly created contact! *******", newContact);
        return res.redirect('/');
    } catch (err) {
        console.log('error while saving the contact', err);
    }
});

/* creating query/string params
app.get("/delete-contact/",function(req,res){
    console.log(req.query);
    let phone= req.query.phone;

    let contactIndex = contactList.findIndex(contact => contact.phone == phone)

    if(contactIndex!= -1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back');
})

*/

/*

// for deleting a contact from the database
app.get("/delete-contact/",function(req,res){
    // get the id from query in the ul

    let id= req.query.id;

   // find the contact in the database using id and delete
   Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return ;
        }
        return res.redirect('back');
   });
    
})
// for above you will get error 
// MongooseError: Model.findByIdAndDelete() no longer accepts a callback */

app.get("/delete-contact/", async function(req, res) {
    try {
        // Get the id from the query in the URL
        let id = req.query.id;

        // Find the contact in the database using id and delete
        const deletedContact = await Contact.findByIdAndDelete(id);
        console.log("Deleted contact fom db", deletedContact);

        return res.redirect('back');
    } catch (err) {
        console.log('Error in deleting an object from the database:', err);
        // Handle the error and send an appropriate response if needed.
        // For example: return res.status(500).send('Internal Server Error');
    }
});


app.listen(port, function(err){
    if(err){
        console.log('this is error',err);

    }
    console.log('Yup express server is up and running on port ',port);
});