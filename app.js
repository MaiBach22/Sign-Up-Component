//jshint esversion: 6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0/lists/3e62f8e8eb";
  const options = {
    method: "POST",
    auth: "MaiBachPham:4v7a6e1ec55576f917babfd27c9d69eb9-us1",
  };
  const require = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });
  require.write(jsonData);
  require.end();
});

app.post("/failure.html", function (req, res) {
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

//API key
//47a6e1ec55576f917babfd27c9d69eb9-us1

//ListID
//3e62f8e8eb
