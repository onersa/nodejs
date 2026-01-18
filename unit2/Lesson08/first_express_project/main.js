const port = 3000;
const express = require("express")

//We call express function which returns the object
//We have access to express methods
//It is known as epress application or express application 
const app = express();
app
  .get("/", (req, res) => {
    console.log("Params: ", req.params);
    console.log("Body:", req.body);
    console.log("URL: ", req.url);
    console.log("Query: ", req.query);
    res.send("Hello, Root Route!");
  })

  .get("/department", (req, res)   => {
      res.send("This is a department route")
  })

  .get("/users", (req, res) => {
    console.log("Params: ", req.params);
    console.log("Body:", req.body);
    console.log("URL: ", req.url);
    console.log("Query: ", req.query);
    res.send("Hello, Users Route!");
  })

  .get("/users/:dept", (req, res) => {
    console.log("Params: ", req.params);
    console.log("Body:", req.body);
    console.log("URL: ", req.url);
    console.log("Query: ", req.query);
    res.send("Hello, Users Params Route!");
  })
  .listen(port, () => {
    console.log(`The Express.js server has started and is listening
➥ on port number: ${port}`);
  });
