const BlogPost = require("../models/BlogPost");
module.exports = async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  console.log(
    `Single post found by _id: ${blogpost} with params: ${req.params.id}`,
  );
  res.render("post", { blogpost });
};
