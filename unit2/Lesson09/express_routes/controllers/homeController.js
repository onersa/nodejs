// exports.sendReqParams =

  exports.sendPostReq = (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Request Query", req.query);
  res.send("POST Successful! in a controller");
}