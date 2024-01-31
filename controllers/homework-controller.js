const prisma = require("../models/prisma");
const tryCatch = require("../utils/tryCatch");

exports.createHomework = tryCatch(async (req, res, next) => {
  const { question, startDate, dueDate, subjectId, published } = req.body;
  console.log(req.body);
  if (req.user.role !== "teacher") throw new Error("Unauthorized::400");
  const result = await prisma.homework.create({
    data: {
      ...req.body,
      teacherId: req.user.id,
      startDate: new Date(startDate),
      dueDate: new Date(dueDate),
    },
  });
  res.json({ result });
});
