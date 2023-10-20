const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sign_up', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
    Name: String,
    Email:String,
    password1: String,
    password2: String,
});

const User = mongoose.model('User', userSchema);
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signup', function (req, res) {
    const { Name, Email, password1,password2 } = req.body;
    const newUser = new User({
        Name,
        Email,
        password1,
        password2,
    });

app.post('/login', function (req, res) {
    const { username, password } = req.body;
    User.findOne({ username, password })
        .then(user => {
            if (user) {
                console.log('User logged in successfully');
                return res.redirect('./index.html');
            } else {
                console.log('Invalid credentials. Redirecting to login page.');
                return res.redirect('./login.html');
            }
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('Error during login. Please try again.');
        });
});
app.listen(7000, function () {
    console.log("Server listening at port 7000");
});