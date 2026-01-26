const express = require("express");
const homeController = require("./controllers/homeController")
 const errorController = require("./controllers/errorController")
const layouts = require("express-ejs-layouts");
const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
//  res.send("Welcome to Confetti Cuisine!");
throw(ex);
res.render("index")
});

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

 app.listen(app.get("port"), ()=>{
    console.log(`server  running at http://localhost:${app.get("port")}`);
 });


