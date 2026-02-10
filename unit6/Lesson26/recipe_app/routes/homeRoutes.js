// const router = require("express").Router();
// const homeController = require("../controllers/homeController");

// router.get("/", homeController.displayHomepage);

// module.exports = router;

const router = require("express").Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.displayHomepage);

module.exports = router;
