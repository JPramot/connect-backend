const prisma = require("../models/prisma");
const bcrypt = require("bcryptjs");

const tryCatch = (func) => (req, res, next) => func(req, res, next).catch(next);

module.exports.register = tryCatch(async (req, res, next) => {
  const { s_code, firstName, password, confirmPassword, email } = req.body;

  if (!(s_code && firstName && password && confirmPassword))
    return next(new Error("fulfill the blank input::400"));
  if (password !== confirmPassword)
    throw new Error("password and confirmPassword is not match");
  const { confirmPassword: cfpw, ...data } = req.body;
  data.password = await bcrypt.hash(data.password, 10);
  const student = await prisma.student.create({
    data,
  });
  console.log(student);
  res.json({ message: "register success" });
});

module.exports.login = (req, res, next) => {};
