const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
    
})

app.post("/", function(req, res){
    // res.send("Request received succesfully");
    const city = req.body.cityName;

    const url = "https://api.openweathermap.org/data/2.5/weather?appid=ee1e7589f5229546caf77e0ba6ce2df4&q=" + city;

    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp; 
            const desc = "The current weather is " + weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("The temperature in " + city +" is " + (temp  - 273) + " degrees Celcius." + desc);
            res.send();

        })
    })
    
})



app.listen(5000, function(){
    console.log("Server started on port number 5000...");
})