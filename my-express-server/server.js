//eslint esversion: 6

const express = require("express");
const app = express();

app.get("/", function(request, response){
    response.send("<h1>Hello from the server lmfao!</h1>");
    // console.log(request);
});

app.get("/about", function(req, res){
    res.send("Hello there! I am Ajinkya Kale, a SDE intern at Rodic Consultants. I am responsible for building an AI powered chatbot for the company.");
});

app.listen(3000, function(){
    console.log("Server started at port 3000! Booyaah!");
});

