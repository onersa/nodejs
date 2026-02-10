const express = require("express");
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const path = require("path");
const homeController = require("./controllers/homeController");
const coursesController = require("./controllers/coursesController");
const connectFlash = require("connect-flash");


const passport = require("passport");
// cookieParser = require("cookie-parser"),
const expressSession = require("express-session");
const User = require("./models/user");
const expressValidator = require("express-validator");
// router.use(cookieParser("secretCuisine123"));

// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

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

router.use(expressSession({
  secret: "secretCuisine123",
  cookie: {
    maxAge: 4000000
  },
resave: false,
  saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(connectFlash());
router.use((req, res, next) => {
res.locals.flashMessages = req.flash();
res.locals.loggedIn = req.isAuthenticated();
res.locals.currentUser = req.user;
next();
});

 router.use(expressValidator());

//ROUTE CONTROLLERS
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate);
router.get("/users/logout", usersController.logout, usersController.redirectView );

router.get("/", homeController.displayHomepage);
router.get("/subscribers", subscribersController.index,subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);

router.post("/subscribers/create", subscribersController.create,subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/subscribers/:id/delete",subscribersController.delete, subscribersController.redirectView);

router.get("/users", usersController.index,usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.validate, usersController.create,usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);


router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);

//ERROR CONTROLLERS
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})