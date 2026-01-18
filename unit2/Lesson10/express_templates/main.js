const express = require("express");
const layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController");
const app = express();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs")
app.use(layouts);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", homeController.sendHomeRoute);

app.get("/name/:myName", homeController.respondWithName);

app.listen(app.get("port"), ()=>{
    `Server listening on port ${app.get("port")}`
});
