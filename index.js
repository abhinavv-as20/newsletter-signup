//jshint esversion: 8

const express = require("express");
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");

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

    const myApiKey = "fbf29ca7280fce113e1d2429de6ad53d-us17";
    const url = "us17";

    client.setConfig({
        apiKey: myApiKey,
        server: url,
    });

    const run = async () => {
        const response = await client.lists.batchListMembers("68447216e2", {
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


