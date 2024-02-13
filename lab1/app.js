const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let errorMsg = "";
let successMsg = "";
app.set("view-engine", "ejs");
app.use(bodyParser.urlencoded());

let users = [];
let lastIndex = users.length;
app.get("/users", function (req, res) {
  errorMsg = "";
  successMsg = "";
  res.render("users.ejs", {
    users: users,
    errorMsg: errorMsg,
    successMsg: successMsg
  });
});

app.post("/adduser", function (req, res) {
  errorMsg = "";
  successMsg = "";
  if (
    req.body.email !== "" &&
    req.body.password !== "" &&
    req.body.name !== ""
  ) {
    if (req.body.password.length >= 8) {
      req.body.id = ++lastIndex;
      users.push(req.body);
      successMsg = "Registration success";
    } else {
      errorMsg = "Password must be at least 8 characters.";
    }
  } else {
    errorMsg = "Please fill all inputs, All inputs are required.";
  }
  res.render("users.ejs", {
    users: users,
    errorMsg: errorMsg,
    successMsg: successMsg
  });
});

app.listen(8080);
