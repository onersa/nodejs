const express = require("express");
const path = require("path");
const port = process.env.PORT || 4000;

const app = express();
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "pages/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/contact.html"));
});

app.get("/post", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/post.html"));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});