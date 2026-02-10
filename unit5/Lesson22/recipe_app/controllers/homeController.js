module.exports  = {
sendHomeRoute : (req, res) => {
  console.log(req.url);
  res.send("HOME ROUTE");
},

respondWithName : (req, res) => {
    // let paramsName = req.params.myName
    res.render("index", {name: paramsName})
},

displayHomepage: (req, res) => {
  res.render("index");
}

}