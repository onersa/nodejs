const BlogPost = require("../models/BlogPost");

module.exports =  async (req, res) => {
  const blogposts = await BlogPost.find({});
  console.log(`cookie userid: ${req.session.userId}`);
  res.render("index", {
    blogposts
  });
}