const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
mongoose.connect("mongodb://localhost:27017/recipe_db");

// Subscriber.create({
//   name: "Jon",
//   email: "jon@jonwexler.com",
//   zipCode: "12345",
// })
//   .then((subscriber) => console.log(subscriber))
//   .catch((error) => console.log(error.message));
// let subscriber;
// Subscriber.findOne({
//   name: "Jon",
// }).then((result) => {
//   subscriber = result;
//   console.log(subscriber.getInfo());
// });

const Course = require("./models/course");
let testCourse, testSubscriber;
// Course.create({
//   title: "Tomato Land",
//   description: "Locally farmed tomatoes only",
//   zipCode: 12345,
//   items: ["cherry", "heirloom"],
// }).then((course) => (testCourse = course));
// testCourse = Course.findOne({});
// Subscriber.findOne({}).then((subscriber) => (testSubscriber = subscriber));
// testSubscriber.courses.push(testCourse._id);
// testSubscriber.save();
// Subscriber.populate(testSubscriber, "courses").then(subscriber =>
//  console.log(subscriber)
// );
// let obj = Subscriber.findOne({});
// console.log(obj.name);

// Course.create({
//   title: "Tomato2 Land",
//   description: "Locally farmed tomatoes only2",
//   zipCode: 12345,
//   items: ["cherry", "heirloom"],
// })
//   .then((course) => {
//     return Subscriber.findOne({}).then((subscriber) => {
//       subscriber.courses.push(course._id);
//       return subscriber.save();
//     });
//   })
//   .then((subscriber) => {
//     return Subscriber.populate(subscriber, "courses");
//   })
//   .then((subscriber) => {
//     console.log(subscriber);
//   })
//   .catch((err) => console.error(err));

  (async () => {
    const testCourse = await Course.create({
      title: "Tomato Land",
      description: "Locally farmed tomatoes only",
      zipCode: 12345,
      items: ["cherry", "heirloom"],
    });

    const testSubscriber = await Subscriber.findOne({});

    testSubscriber.courses.push(testCourse._id);
    await testSubscriber.save();

    const populatedSubscriber = await Subscriber.findById(
      testSubscriber._id,
    ).populate("courses");

    console.log(populatedSubscriber);
  })();