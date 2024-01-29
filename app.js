const express = require("express");
const cors = require("cors");
require("dotenv").config();

const notfound = require("./middleware/notfound");
const error = require("./middleware/error");

const authRoute = require("./routes/auth-route");

const app = express();

// กันการยิง api ข้ามtap
// มีการยิง package พิเศษก่อน ถ้าไม่มีการตอบกลับจะถือว่าไม่ปลอดภัย
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);

app.use(notfound);

app.use(error);

let port = process.env.PORT;
app.listen(port, () => {
  console.log("server is running on port", port);
});
