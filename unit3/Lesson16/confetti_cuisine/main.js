const express = require("express");
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine", {
  
});

const db = mongoose.connection;
db.once("open", ()=>{
    console.log('The connection to the database is successful');
});

const app = express();
const port = process.env.port || 3000;
app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", subscribersController.home);

//ROUTE CONTROLLERS
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);

//ERROR CONTROLLERS
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})