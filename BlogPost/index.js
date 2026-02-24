const express = require("express");
const expressSession = require("express-session");
const ejs = require("ejs");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const flash = require("connect-flash");
const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser")
const logoutController = require("./controllers/logout");
const validateMiddleWare = require("./middleware/validationMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");




mongoose.connect("mongodb://localhost:27017/my_database");

const db = mongoose.connection;

db.once("open" , () => {
  console.log('Connection to mangoDB established');
})
const port = process.env.PORT || 4000;

const app = express();
 
app.use(flash());

app.use(
  expressSession({
    secret: "Glory be to God",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(fileUpload());
app.set("view engine", "ejs");

global.loggedIn = null;

app.use((req, res, next) => {
  loggedIn = req.session.userId;
  next();
});


const customMiddleware = (req, res, next) => {
  // console.log('Generic middleware. It runs all the time');
  next();
};

app.use(customMiddleware);
app.use("/posts/store", validateMiddleWare);



app.get("/", homeController);

app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);

app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);

app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController,
);

app.get("/auth/logout", logoutController);

app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController,
);

app.get("/posts/new", authMiddleware, newPostController);

app.post("/posts/store", authMiddleware, storePostController );

app.get("/post/:id", getPostController);

app.use((req, res) => {
  res.render("notfound");
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});