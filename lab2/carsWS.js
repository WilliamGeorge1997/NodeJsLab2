const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let cars = [];
let lastIndex = cars.length;

/* ------------------------------ Get all cars ------------------------------ */

app.get("/cars/showlist", function (req, res) {
  res.send({
    data: cars,
    msg: "Success",
  });
});

/* ------------------------------ Get one a car ----------------------------- */
app.get("/cars/getcar", function (req, res) {
  const cid = req.query.id;
  const car = cars.find((car) => car.id == cid);

  const body = {
    data: car,
  };
  car ? (body.msg = "Success") : (body.msg = "Failed");

  res.send(body);
});

/* -------------------------------- Add a car ------------------------------- */
app.post("/cars/add", function (req, res) {
  const car = req.body;
  car.id = String(++lastIndex);
  cars.push(car);

  const body = {
    msg: "Success",
  };
  res.send(body);
});

/* ----------------------------- Delete a car ----------------------------- */
app.get("/cars/delete/:id", function (req, res) {
  const cid = req.params.id;
  const carIndex = cars.findIndex((car) => car.id == cid);
  const body = {};
  if (carIndex >= 0) {
    cars.splice(carIndex, 1);
    body.msg = "Success";
  } else {
    body.msg = "Not Found";
  }

  res.send(body);
});


app.get("/",function(req,res){
  res.sendFile(__dirname+"\\index.html")
})



app.listen(8080);
