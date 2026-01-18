const port = 3000;
const express = require("express");
const homeController = require("./controllers/homeController") 
const app = express();

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`second middleware!`);
  next();
});

app.get("/", (req, res) => {
  res.send(`This is the root route`);
});




app.get("/items/:vegetable", (req, res) => {
  let veg = req.params.vegetable;
  console.log("Params:", req.params);
  res.send(`This is the page for VEGETABLE`);
});

app.post("/", homeController.sendPostReq );

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
