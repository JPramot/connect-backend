const prisma = require("../models/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tryCatch = require("../utils/tryCatch");

// const tryCatch = (func) => (req, res, next) => func(req, res, next).catch(next);

const jwtSecret = process.env.SECRET;

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
  if (s_code && t_code) {
    throw new Error("teacher or Student::400");
  }
  if (s_code && !/^[s]\d{3}$/.test(s_code))
    throw new Error("wrong code format");
  if (t_code && !/^[t]\d{3}$/.test(t_code))
    throw new Error("wrong code format");
  const result = t_code
    ? await prisma.teacher.findFirstOrThrow({
        where: { t_code },
      })
    : await prisma.student.findFirstOrThrow({ where: { s_code } });
  const decode = await bcrypt.compare(password, result.password);
  if (!decode) throw new Error(" password wrong");
  const payload = t_code
    ? { id: result.id, t_code: result.t_code }
    : { id: result.id, s_code: result.s_code };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: 60 * 60 * 24 });
  const { password: pw, ...obj } = req.body;
  res.status(200).json({ ...obj, token });
});

exports.getMe = (req, res, next) => {
  res.json({ user: req.user });
};
