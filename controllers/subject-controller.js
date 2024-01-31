const prisma = require("../models/prisma");

exports.getAll = (req, res, next) => {
  res.json({ message: "get all" });
};
