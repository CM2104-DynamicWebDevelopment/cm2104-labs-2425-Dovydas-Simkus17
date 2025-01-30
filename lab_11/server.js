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

app.listen(8080);