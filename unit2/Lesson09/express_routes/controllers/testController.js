exports.clientInfo = (req, res) => {
  console.log(`URL: ${req.url}`);
  const id = req.params["id"];
  console.log("ID: ", id);
  if (id == 2) res.send("Tshepiso Molapisi (Account No 2)");
  else if (id == 3) res.send("Naledi Molapisi (Account No 3)");
  else res.send("Sorry the account does not exist");
};