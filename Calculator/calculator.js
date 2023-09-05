//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
    
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);

    let result = num1 + num2;

    res.send(`The sum of ${num1} & ${num2} is ${result}`);
})

app.get("/bmi", function(req, res){
    
    res.sendFile(__dirname + "/bmiCalculator.html")
});

app.post("/bmi", function(req, res){
    let hgt = Number(req.body.height);
    let wgt = Number(req.body.weight);

    let result = wgt / (hgt * hgt);

    res.send(`Your BMI is ${result}`);
});


app.listen(5000);