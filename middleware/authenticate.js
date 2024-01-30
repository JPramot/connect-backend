const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");
const tryCatch = require("../utils/tryCatch");

module.exports = tryCatch(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) throw new Error("UnAuthorized");
  if (!authorization.startsWith("Bearer")) throw new Error("UnAuthorized");
  const token = authorization.split(" ")[1];
  if (!token) throw new Error("UnAuthorized");
  const { t_code, s_code, id } = jwt.verify(token, process.env.SECRET);
  const result = t_code
    ? await prisma.teacher.findFirstOrThrow({
        where: { t_code },
      })
    : await prisma.student.findFirstOrThrow({
        where: { s_code },
      });
  delete result.password;
  req.user = result;
  next();
});
