const express = require("express");
const layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber")

const app = express();

mongoose.connect("mongodb://localhost:27017/recipe_db");
const db = mongoose.connection;


// //example1
// let subscriber1 = new Subscriber({
//   name: "Nikki",
//   email:"nikki@gmail.com",
// });


// //new from claude.ai

// subscriber1
//   .save()
//   .then((savedDocument) => console.log(savedDocument))
//   .catch((err) => console.error(err));

// //example 2


// //new from claude.ai
// Subscriber.create({
//   name: "Jon Wexler22",
//   email: "jon22@jonwexler.com",
// })
//   .then((savedDocument) => console.log(savedDocument))
//   .catch((err) => console.error(err));

let myQuery = Subscriber.findOne({
 name: "Jon Wexler22"
 })
 .where("email", /wexler/);
// myQuery.exec((error, data) => {
//  if (data) console.log(data.name);
// });
myQuery.exec()
.then((data) => {
  console.log(data.name);
})
.catch((error) => {
  console.log(error);
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs")
app.use(layouts);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'))
app.use(errorController.logErrors);
app.get("/", homeController.sendHomeRoute);

app.get("/name/:myName", homeController.respondWithName);


app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), ()=>{
    `Server listening on port ${app.get("port")}`
});
