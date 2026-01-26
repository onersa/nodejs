const express = require("express");
const layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

const app = express();

// ===================================
// SUMMARY FROM claude.ai
// This JavaScript code demonstrates basic MongoDB database operations:
// Connection: Connects to a MongoDB instance running locally on port 27017 and accesses the "recipe_db" database.
// Insert Operation: Adds a new contact document to the "contacts" collection with name and email fields.
// Query Operation: Retrieves all documents from the "contacts" collection and converts them to an array for logging.
// Note: The code uses the older callback-based API syntax. Modern MongoDB driver versions (4.0+) 
// recommend using async/await with promises instead. Also, there's no explicit client.close() call, 
// which means the connection remains open after operations complete.
//====================================

const MongoDB = require("mongodb").MongoClient;
const dbURL = "mongodb://localhost:27017";
const dbName = "recipe_db";

MongoDB.connect(dbURL, (error, client) => {
  if (error) throw error;

  let db = client.db(dbName);

  db.collection("contacts").insertOne(
    {
      name: "Freddie Mercury",
      email: "fred@queen.com",
    },
    (error, db) => {
      if (error) throw error;
      console.log(db);
    },
  );

  db.collection("contacts")
    .find()
    .toArray((error, data) => {
      if (error) throw error;
      console.log(data);
    });
});


app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs")
app.use(layouts);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'))
app.use(errorController.logErrors);
app.get("/", homeController.sendHomeRoute);

app.get("/name/:myName", homeController.respondWithName);


app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), ()=>{
    `Server listening on port ${app.get("port")}`
});
