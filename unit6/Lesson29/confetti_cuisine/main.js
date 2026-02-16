const express = require("express");
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const path = require("path");
const connectFlash = require("connect-flash");
const router = require("./routes/index");


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
// router = express.Router();
const app = express();

const port = process.env.port || 3000;

app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.set("view engine", "ejs")
app.use(express.static("public"));

app.use(layouts);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  }),
);


app.use(expressSession({
  secret: "secretCuisine123",
  cookie: {
    maxAge: 4000000
  },
resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(connectFlash());
app.use((req, res, next) => {
res.locals.flashMessages = req.flash();
res.locals.loggedIn = req.isAuthenticated();
res.locals.currentUser = req.user;
next();
});

 app.use(expressValidator());

 app.use("/", router);

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})