// const mongoose = require("mongoose");
// const Subscriber = require("./models/subscriber");
// mongoose.connect("mongodb://localhost:27017/recipe_db");

// const subscribers = Subscriber.find({
//   courses: mongoose.Types.ObjectId("5986b8aad7f31c479a983b42"),
// });

// console.log(subscribers);

const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const Course = require("./models/course");

mongoose.connect("mongodb://localhost:27017/recipe_db");

// Using async/await (recommended)
async function findSubscribers() {
  try {
    const subscribers = await Subscriber.findOne({
      //   courses: new mongoose.Types.ObjectId("697733537cceef068f1cd752"),
      // Or simply: courses: "5986b8aad7f31c479a983b42"
      courses: "697733537cceef068f1cd752",
    });
    const result = await subscribers.populate("courses")
    console.log(subscribers);
    console.log('\n\n');
    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
  }
}

findSubscribers();