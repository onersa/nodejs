  exports.sendReqParams = (req, res) => {
  let veg = req.params.vegetable;
  console.log("Params:", req.params);
  res.send(`This is the page for VEGETABLE`);
}

  exports.sendPostReq = (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Request Query", req.query);
  res.send("POST Successful! in a controller");
}