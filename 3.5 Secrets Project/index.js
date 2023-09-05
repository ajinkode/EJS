import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let userIsAuthorised = false;
app.use(bodyParser.urlencoded({extended: true}));

function authorization(req, res, next){
    if(req.body["password"] == "ILoveProgramming")
        userIsAuthorised = true;

    next();
}

app.use(authorization);

app.get("/", function(req, res){
    res.sendFile(__dirname + "'public/index.js");
})

app.post("/check", function(req, res){

    if(userIsAuthorised == true)
        res.sendFile(__dirname + "public/secrets");

    else        
        res.send("<h1>Invalid Password! Please try again.</h1>");

})

app.listen(port, function(){
    console.log(`Listening on port ${port}`);
})



