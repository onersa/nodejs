const express = require("express");
const layouts = require("express-ejs-layouts");
// const homeController = require("./controllers/homeController");
// const errorController = require("./controllers/errorController");
// const subscribersController = require("./controllers/subscribersController")
// const usersController = require("./controllers/usersController");
// const coursesController = require("./controllers/coursesController");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber")
const methodOverride = require("method-override");
const expressSession = require("express-session");
const connectFlash = require("connect-flash");
const expressValidator = require("express-validator");
const passport = require("passport");
const User = require("./models/user");

// const router = express.Router(); 
const router = require("./routes/index");

const app = express();


mongoose.connect("mongodb://localhost:27017/recipe_db");
const db = mongoose.connection;

app.set("port", process.env.PORT || 3000);


app.set("view engine", "ejs");
app.use(layouts);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'))

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  }),
);


app.use(expressValidator());
app.use(errorController.logErrors);

app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  // res.locals.flashMessages = () => req.flash();
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

app.use("/", router);

// ================================
          // HOME ROUTE
// ==================================
// router.get("/", homeController.displayHomepage);
// // router.get("/name/:myName", homeController.respondWithName);

// // =================================
// //              COURSES ROUTE
// // =================================
// router.get("/courses", coursesController.showCourses)
// router.get("/courses/new", coursesController.new)
// router.post("/courses/create", coursesController.create, coursesController.redirectView);
// router.get("/courses/:id",coursesController.show, coursesController.showView);
// router.get("/courses/:id/edit", coursesController.edit);
// router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
// router.delete("/courses/:id/delete", coursesController.delete,  coursesController.redirectView);

// // =================================
// //            SUBSCRIBER ROUTE
// // =================================
// router.get("/subscribers", subscribersController.showSubscribers);
// router.get("/subscribers/new", subscribersController.new);
// router.post(
//   "/subscribers/create",
//   subscribersController.create,
//   subscribersController.redirectView,
// );
// router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
// router.get("/subscribers/:id/edit", subscribersController.edit);
// router.put(
//   "/subscribers/:id/update",
//   subscribersController.update,
//   subscribersController.redirectView,
// );
// router.delete(
//   "/subscribers/:id/delete",
//   subscribersController.delete,
//   subscribersController.redirectView,
// );

// // =================================
// //              USERS ROUTE
// // =================================
// router.get("/users/login", usersController.login);
// router.post("/users/login", usersController.authenticate)
// router.get("/users", usersController.index, usersController.indexView);
// router.get("/users/new", usersController.new);
// router.get("/users/add", usersController.add, usersController.redirectView);
// router.post("/users/create", usersController.validate, usersController.create, usersController.redirectView);
// router.get(
//   "/users/logout",
//   usersController.logout,
//   usersController.redirectView,
// );
// router.get("/users/:id", usersController.show, usersController.showView);
// router.get("/users/:id/edit", usersController.edit);
// router.put("/users/:id/update", usersController.update, usersController.redirectView);
// router.delete(
//   "/users/:id/delete",
//   usersController.delete,
//   usersController.redirectView,
// );
// app.use(errorController.respondNoResourceFound);
// app.use(errorController.respondInternalError);



app.listen(app.get("port"), ()=>{
    `Server listening on port ${app.get("port")}`
});
