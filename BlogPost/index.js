const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const validateMiddleWare = require("./middleware/validationMiddleware")

mongoose.connect("mongodb://localhost:27017/my_database");

const db = mongoose.connection;

db.once("open" , () => {
  console.log('Connection to mangoDB established');
})
const port = process.env.PORT || 4000;

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(fileUpload());
app.set("view engine", "ejs");

const customMiddleware = (req, res, next) => {
  console.log('Generic middleware. It runs all the time');
  next();
};



app.use(customMiddleware);
app.use("/posts/store", validateMiddleWare);

app.get("/", homeController);


app.get("/posts/new", newPostController);

app.post("/posts/store", storePostController );

app.get("/post/:id", getPostController);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});