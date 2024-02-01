const prisma = require("../models/prisma");
const tryCatch = require("../utils/tryCatch");

exports.createHomework = tryCatch(async (req, res, next) => {
  const { question, startDate, dueDate, subjectId, published } = req.body;
  console.log(req.body);
  if (req.user.role !== "teacher") throw new Error("Unauthorized::400");
  const result = await prisma.homework.create({
    data: {
      ...req.body,
      subjectId: +subjectId,
      teacherId: +req.user.id,
      startDate: new Date(startDate),
      dueDate: new Date(dueDate),
    },
  });
  res.json({ result });
});

exports.getHomework = tryCatch(async (req, res, next) => {
  const homework = await prisma.homework.findMany({
    where: {
      teacherId: +req.user.id,
    },
    include: {
      subject: {
        select: {
          title: true,
        },
      },
    },
  });
  res.json({ homework });
});

exports.updateHomework = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { question, startDate, dueDate, subjectId, published } = req.body;
  console.log(typeof req.user.id);
  const result = await prisma.homework.update({
    where: {
      id: +id,
    },
    data: {
      question,
      startDate,
      dueDate,
      subjectId: +subjectId,
      published,
      teacherId: +req.user.id,
    },
  });
  res.json({ result });
});

exports.deleteHomework = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  await prisma.homework.delete({
    where: {
      id: +id,
    },
  });
  res.json({ message: "ok" });
});
