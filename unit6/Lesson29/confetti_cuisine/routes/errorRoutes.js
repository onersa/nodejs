const router = require("express").Router();
const errorsController = require("../controllers/errorController");

router.use(errorsController.logErrors);
router.use(errorsController.respondNoResourceFound);
router.use(errorsController.respondInternalError);

module.exports = router;