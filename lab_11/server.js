var express = require('express');
var app = express();
var http = require('http');
var knockknock = require('knock-knock-jokes');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))

app.get('/', function(req,res){
    res.send("Hello world! by express");
});
app.get('/test', function(req,res){
    res.send("this is route 2");
});
app.get('/joke',function (req, res) {
 res.writeHead(200, {'Content-Type': 'text/html'});
 var randomJocke = knockknock();
 res.end(randomJocke);
 
});

app.get('/add', function(req,res){
    var x = parseInt(req.query.x);
    var y = parseInt(req.query.y);
    res.send("X + Y= "+(x+y));
});

app.get('/calc', function(req,res){
    var x = parseInt(req.query.x);
    var y = parseInt(req.query.y);
    var op = req.query.operator;
    if(op === "add"){
        res.send("X + Y= "+(x+y));
    }else if(op === "sub"){
        res.send("X - Y= "+(x-y));
    }else if(op === "mul"){
        res.send("X x Y= "+(x*y));
    }else if(op === "div"){
        res.send("X / Y= "+(x/y));
    }else{
        res.send("I don't understand");
    }
});
app.get('/getform', function(req,res){
    var name = req.query.name;
    var quest = req.query.quest;
    res.send("Hi " +name+ "! I am sure you will " +quest+ "!");
});
app.post('/postform', function(req,res){
    var name = req.body.name;
    var quest = req.body.quest;
    res.send("Hi " +name+ "! I am sure you will " +quest+ "!");
})
app.get('/user/:userID/books/:bookID', function(req,res){
    var userID = req.params.userID;
    var bookID = req.params.bookID;
    res.send("Hello "+userID+ " is this your book?: "+bookID);
})
app.use(function (req,res,next){
    res.send('This pge does not exist!')
})
app.listen(8080);