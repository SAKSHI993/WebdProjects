//jshint esversion:6
const express = require("express");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname,

      }

    }]
  };


  const jsonData = JSON.stringify(data);
  const url = "https://us20.api.mailchimp.com/3.0/lists/e98a7d7491";

  const options = {
    method: "POST",
    auth: "saku:758126a9f1c94fb7f74d8342f3683ad5-us20"
  };

const request= https.request(url, options, function(response) {

if(response.statusCode===200){
  res.sendFile(__dirname+"/success.html");
}
else{
  res.sendFile(__dirname+"/failure.html");
}

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("the server is running on port 3000");
});


//api
//758126a9f1c94fb7f74d8342f3683ad5-us20

//list // IDEA: e98a7d7491
