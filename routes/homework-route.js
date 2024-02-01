const { Router } = require("express");
const homeworkController = require("../controllers/homework-controller");
const authenticate = require("../middleware/authenticate");

const router = Router();

router.post("/", authenticate, homeworkController.createHomework);
router.get("/", authenticate, homeworkController.getHomework);
router.put("/:id", authenticate, homeworkController.updateHomework);
router.delete("/:id", authenticate, homeworkController.deleteHomework);

module.exports = router;
