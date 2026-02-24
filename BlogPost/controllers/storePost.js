
const path = require("path");
const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
  const image = req.files.image;
  const myPath = path.resolve(__dirname, "../public/img", image.name);
  const blogPostBody = req.body;
  blogPostBody["image"] = "/img/" + image.name;
  blogPostBody["userid"] = req.session.userId;
  console.log(`image file: ${image.name} myPath: ${myPath}`);
  image.mv(
    path.resolve(__dirname, "../public/img", image.name),
    async () => {
      try {
        await BlogPost.create(blogPostBody);
      res.redirect("/");
      } catch(error) {
        const validationErrors = Object.keys(error.erros).map(key => {
          error.errors[key].message
        });
        console.log(`Bokamoso app error objects: ${validationErrors}`);
        req.session.validationErrors = validationErrors;
        return res.redirect("/auth/register")
      }
      
    },
  );
};


