const express = require("express");
const layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
subscribersController = require("./controllers/subscribersController")
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber")

const app = express();

mongoose.connect("mongodb://localhost:27017/recipe_db");
const db = mongoose.connection;



app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs")
app.use(layouts);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'))
app.use(errorController.logErrors);
app.get("/", homeController.sendHomeRoute);

app.get("/name/:myName", homeController.respondWithName);
app.get(
  "/subscribers",
  subscribersController.getAllSubscribers,
  subscribersController.displaySubscribers,
);

app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);

app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), ()=>{
    `Server listening on port ${app.get("port")}`
});
