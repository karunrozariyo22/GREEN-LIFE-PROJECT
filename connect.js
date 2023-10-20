var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mini');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/mini', function(req,res){
    var Name = req.body.name;
    var email = req.body.email;
    var subject =req.body.subject;
    var message =req.body.message;
    var data = {
        "name": Name,
        "email":Email,
        "subject":Subject,
        "message":Message,

    }
db.collection('Orders').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");       
    });
     return res.redirect('success.html');
})
app.listen(7000);
console.log("server listening at port 4000");
