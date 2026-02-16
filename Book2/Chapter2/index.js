const express = require("express");
const path = require("path");
const app = express();
app.set("port", process.env.PORT || 3000);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/contact.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/about.html"));
});

app.get("/users", (req, res) => {
    res.json({
        "name": "Vusi Molapisi"
    })
});

app.listen(app.get("port"), ()=>{
    console.log(`Server running on port ${app.get("port")}`);
});