const express = require("express");
const layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
subscribersController = require("./controllers/subscribersController")
const usersController = require("./controllers/usersController");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber")

const router = express.Router(); 
const app = express();


mongoose.connect("mongodb://localhost:27017/recipe_db");
const db = mongoose.connection;

app.set("port", process.env.PORT || 3000);


app.set("view engine", "ejs");
app.use(layouts);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'))

app.use("/", router);

app.use(errorController.logErrors);

router.get("/", homeController.sendHomeRoute);


router.get("/name/:myName", homeController.respondWithName);
router.get(
  "/subscribers",
  subscribersController.getAllSubscribers,
  subscribersController.displaySubscribers,
);

router.get("/contact", subscribersController.getSubscriptionPage);
router.post("/subscribe", subscribersController.saveSubscriber);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView)
router.get("/users/:id", usersController.show, usersController.showView);

app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);



app.listen(app.get("port"), ()=>{
    `Server listening on port ${app.get("port")}`
});
