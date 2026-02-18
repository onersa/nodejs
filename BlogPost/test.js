const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");
mongoose.connect("mongodb://localhost:27017/my_database");
const db = mongoose.connection;
db.once("open", () => {
    console.log("Connection to database is successfulblogposts");
    
});

// BlogPost.create({
//     title: "2nd Post",
//     body: "This is an example of another blog..."
// }).then((error, blogpost) => {
//   console.log(error, blogpost);
// });

// BlogPost.find({}).then((error, blogpost) => {
//   console.log(error, blogpost);
// });

BlogPost.findByIdAndDelete("6992eee564511d42aece4796").then(
  (error, blogpost) => {
    console.log(error, blogpost);
  },
);

// BlogPost.findByIdAndDelete("6992ece2680fdbfcddf4f3a4");

// console.log(`Blogpost:  ${blogPost}`);

// const id = "6992ece2680fdbfcddf4f3a4";
// try{
// const blogPost = BlogPost.findByIdAndUpdate(id, 
//     {
//         title: "LAST... UPDATED TITLE", 
//         body: "LAST... body update..."
//     }
// );
// console.log(`Blogpost update: ${blogPost}`);
// } catch(error) {
//     console.log(error.message);
// }
