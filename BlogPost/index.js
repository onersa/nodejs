const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");
const fileUpload = require("express-fileupload");

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

const validateMiddleWare = (req, res, next) => {
  if (req.files == null || req.body.title == null) {
    return res.redirect("/posts/new") 
  }
  next();
};

app.use(customMiddleware);
app.use("/posts/store", validateMiddleWare);

app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render("index", {
    blogposts
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.post("/posts/store", async (req, res) => {
  const image = req.files.image;
  const myPath = path.resolve(__dirname, "./public/img", image.name);
  const blogPostBody = req.body;
  blogPostBody["image"] = "/img/" + image.name;
  console.log(`image file: ${image.name} myPath: ${myPath}`);
  image.mv(path.resolve(__dirname, "./public/img", image.name), async (error) => {

    await BlogPost.create(blogPostBody);
    res.redirect("/");
  });  
});

app.get("/post/:id", async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  console.log(
    `Single post found by _id: ${blogpost} with params: ${req.params.id}`,
  );
  res.render("post", { blogpost });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});