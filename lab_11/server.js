var express = require('express');
var app = express();
var http = require('http');
var knockknock = require('knock-knock-jokes');

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
    res.send("X + Y="+(x+y));
});
app.get('/calc', function(req,res){
    var x = parseInt(req.query.x);
    var y = parseInt(req.query.y);
    var op = req.query.operator;
    if(op.equals("add")){
        res.send("X + Y="+(x+y));
    }else if(op.equals("sub")){
        res.send("X - Y="+(x-y));
    }else if(op.equals("mul")){
        res.send("X x Y="+(x*y));
    }else if(op.equals("div")){
        res.send("X / Y="+(x/y));
    }else{
        res.send("I don't understand");
    }
    
});
app.listen(8080);