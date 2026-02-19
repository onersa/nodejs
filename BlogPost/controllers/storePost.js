
const path = require("path");
const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
  const image = req.files.image;
  const myPath = path.resolve(__dirname, "../public/img", image.name);
  const blogPostBody = req.body;
  blogPostBody["image"] = "/img/" + image.name;
  console.log(`image file: ${image.name} myPath: ${myPath}`);
  image.mv(
    path.resolve(__dirname, "../public/img", image.name),
    async (error) => {
      await BlogPost.create(blogPostBody);
      res.redirect("/");
    },
  );
};
