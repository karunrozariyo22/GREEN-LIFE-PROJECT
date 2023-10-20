var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/green');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
});

var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/index', function(req,res){
    var Name = req.body.Name;
    var Email = req.body.Email;
    var Phone = req.body.Phone;
    var Problem =req.body.Problem;
    var data = {
        "name": Name,
        "email":Email,
        "Phone":Phone,
        "Problem":Problem,
    }
db.collection('mini').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");       
    });
     return res.redirect('success.html');
})
app.listen(7900);
console.log("server listening at port 5000");