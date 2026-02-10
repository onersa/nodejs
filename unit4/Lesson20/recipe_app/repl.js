const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const Course = require("./models/course");
const User = require("./models/user")
mongoose.connect("mongodb://localhost:27017/recipe_db");

async function createAndLinkUser() {
  try {
    const testUser = await User.create({
      name: {
        first: "John",
        last: "Wex",
      },
      email: "jon@jonwexler.com",
      password: "pass123",
    });

    const subscriber = await Subscriber.findOne({ email: testUser.email });

    testUser.subscribedAccount = subscriber;
    await testUser.save();

    console.log("user updated");
    return testUser;
  } catch (error) {
    console.log(error.message);
  }
}
createAndLinkUser();



// async function createTestUser() {
//   try {
//     const testUser = await User.create({
//       name: {
//         first: "Vusi",
//         last: "Molapisi",
//       },
//       email: "vusi@max.com",
//       password: "pass123",
//     });
//     console.log(testUser);
//     return testUser;
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// createTestUser();


// Subscriber.create({
//   name: "Vusi",
//   email: "jVusion@max.com",
//   zipCode: "12345",
// })
//   .then((subscriber) => console.log(subscriber))
//   .catch((error) => console.log(error.message));


// async function findSubscriber() {
//   try {
//     const targetSubscriber = await Subscriber.findOne({
//       email: testUser.email,
//     });
//     console.log(targetSubscriber);
//     return targetSubscriber;
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// findSubscriber();



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


// let testCourse, testSubscriber;
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

  // (async () => {
  //   const testCourse = await Course.create({
  //     title: "Tomato Land",
  //     description: "Locally farmed tomatoes only",
  //     zipCode: 12345,
  //     items: ["cherry", "heirloom"],
  //   });

  //   const testSubscriber = await Subscriber.findOne({});

  //   testSubscriber.courses.push(testCourse._id);
  //   await testSubscriber.save();

  //   const populatedSubscriber = await Subscriber.findById(
  //     testSubscriber._id,
  //   ).populate("courses");

  //   console.log(populatedSubscriber);
  // })();