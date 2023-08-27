const express = require('express');
const path = require('path');
const port = 8000;

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

app.get('/', function(req,res){
    res.render('home', {
        title:'Contact List',
        contact_list: contactList
    });
});

app.get('/contact', function(req,res){
    res.render('contact',{
        title:'Let us play with ejs',
       
    });
});



// creating a controller to append the contact details to practic 

app.post('/create-contact', function(req, res){
    contactList.push({
        name:req.body.name,
        phone: req.body.phone
    })
    return res.redirect('/')
});

// creating query/string params
app.get("/delete-contact/",function(req,res){
    console.log(req.query);
    let phone= req.query.phone;

    let contactIndex = contactList.findIndex(contact => contact.phone == phone)

    if(contactIndex!= -1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back');
})

app.listen(port, function(err){
    if(err){
        console.log('this is error',err);

    }
    console.log('Yup express server is up and running on port ',port);
});