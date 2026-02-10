const express = require("express");
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");
const path = require("path");
const homeController = require("./controllers/homeController");
// const usersController = require("./controllers/subscribersController");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine", {
  
});

const db = mongoose.connection;
db.once("open", ()=>{
    console.log('The connection to the database is successful');
});
router = express.Router();
const app = express();

const port = process.env.port || 3000;

app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.set("view engine", "ejs")
app.use(express.static("public"));

app.use(layouts);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  }),
);

app.use("/", router);

//ROUTE CONTROLLERS
router.get("/", homeController.displayHomepage);
router.get("/subscribers", subscribersController.index,subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);

router.post("/subscribers/create", subscribersController.create,subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/subscribers/:id/delete",subscribersController.delete, subscribersController.redirectView);

router.get("/users/logout", usersController.logout, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

//ERROR CONTROLLERS
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})