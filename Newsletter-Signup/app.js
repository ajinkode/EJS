const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    const https = require("https");

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    let jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/6075b90e3a";

    const options = {
        method: "POST",
        auth: "ajinkya1:c24fb6bb7956a1548f80e8bec2479326-us21"
    }

    const request = https.request(url, options, function(response){
        
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(5000, function(){
    console.log("server running on port 5000.");
});


// API Key
// c24fb6bb7956a1548f80e8bec2479326-us21

//List ID
// 6075b90e3a