const { Router } = require("express");

const subjectController = require("../controllers/subject-controller");

const router = Router();

router.get("/", subjectController.getAll);

module.exports = router;
