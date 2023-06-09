//jshint esversion: 8

const express = require("express");
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");
const fs = require('fs');

const app = express();

app.use(express.static("public"));  //to show the static files from the local machine to our local server (public folder is use to keep the static files)
app.use(bodyParser.urlencoded({extended: true})); //to parse the body (json)

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    let firstName = req.body.Fname;
    let lastName = req.body.Lname;
    let email = req.body.Email;
 
    console.log(firstName, lastName, email);

<<<<<<< HEAD
    const myApiKey = fs.readFileSync('API_KEY.txt', 'utf8').trim();
    const url = "us17";
=======
    const myApiKey = "your API key";
    const url = "us**";
>>>>>>> refs/remotes/origin/main

    client.setConfig({
        apiKey: myApiKey,
        server: url,
    });

    const run = async () => {
        const response = await client.lists.batchListMembers("List_id", {
            members: [{
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }],
        });
        console.log(response);
        
        if(response.error_count === 0){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
    };
    run();
});

app.post("/failure.html", (req, res)=> {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});
