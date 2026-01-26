exports.sendHomeRoute = (req, res) => {
  console.log(req.url);
  res.send("HOME ROUTE FOR molapisi.com");
};

exports.respondWithName = (req, res) => {
  let fname = req.params.myName;
  let context = {
    firstname: fname,
    course: "JavaScript",
    year: 2026,
    grade: 86,
  };
  res.render("index", context);
};