const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const hashPassword = bcrypt.hashSync("123456", 10);
const teacherData = [
  {
    firstName: "Andy",
    t_code: "t001",
    password: hashPassword,
    email: "andy@gmail.com",
  },
  {
    firstName: "Bobby",
    t_code: "t002",
    password: hashPassword,
    email: "bobby@gmail.com",
  },
  {
    firstName: "Candy",
    t_code: "t003",
    password: hashPassword,
    email: "candy@gmail.com",
  },
  {
    firstName: "Dendy",
    t_code: "t004",
    password: hashPassword,
    email: "dendy@gmail.com",
  },
];

const subjectData = [
  { title: "HTML", description: "Write web page" },
  { title: "CSS", description: "Style web page" },
  { title: "JS", description: "Dynamic web page" },
];

async function run() {
  await prisma.teacher.createMany({
    data: teacherData,
  });
  await prisma.subject.createMany({
    data: subjectData,
  });
}

run();
