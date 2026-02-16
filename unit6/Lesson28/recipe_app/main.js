const express = require("express");
const layouts = require("express-ejs-layouts");
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


app.listen(app.get("port"), ()=>{
    `Server listening on port ${app.get("port")}`
});
