exports.sendHomeRoute = (req, res) => {
  console.log(req.url);
  res.send("HOME ROUTE");
}

exports.respondWithName = (req, res) => {
    let paramsName = req.params.myName
    res.render("index", {name: paramsName})
}