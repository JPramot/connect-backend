const prisma = require("../models/prisma");

const tryCatch = require("../utils/tryCatch");

exports.getAll = tryCatch(async (req, res, next) => {
  const subject = await prisma.subject.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  res.json({ subject });
});
