const prisma = require("../models/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const tryCatch = (func) => (req, res, next) => func(req, res, next).catch(next);

const secret = process.env.SECRET;

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

exports.login = tryCatch(async (req, res, next) => {
  const { s_code, t_code, password } = req.body;
  if (!((s_code || t_code) && password)) {
    throw new Error("student code and password is required");
  }
  const student = await prisma.student.findFirst({
    where: {
      s_code: s_code,
    },
  });
  const decode = await bcrypt.compare(password, student.password);
  if (!decode) throw new Error("s_code or password wrong");
  const token = jwt.sign({ id: student.id, s_code: student.s_code }, secret, {
    expiresIn: 60 * 60 * 24,
  });
  const { password: pw, ...obj } = req.body;
  res.status(200).json({ ...obj, token });
});
