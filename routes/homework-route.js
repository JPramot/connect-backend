const { Router } = require("express");
const homeworkController = require("../controllers/homework-controller");
const authenticate = require("../middleware/authenticate");

const router = Router();

router.post("/", authenticate, homeworkController.createHomework);

module.exports = router;
