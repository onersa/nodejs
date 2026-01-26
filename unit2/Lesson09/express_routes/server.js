const express = require("express");
const clientInfoController = require("./controllers/testController")
const port = 3000;
const app = express();

// app.use(express.urlencoded({extended: false}))

// app.use(express.json())

app.get("/", (req, res) => {
  console.log("Params: ", req.params);
  console.log(`URL: ${req.url}`);
  res.send("This is a root route");
});

app.get("/clients", (req, res) => {
  console.log(`URL: ${req.url}`);
  console.log("Clinic site: ", req.query);
  res.send("Clients here...");
});


app.get("/clients/:id", clientInfoController.clientInfo);

app.listen(port , () => {
    console.log(`Server running on port ${port} `);
});


