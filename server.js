const express = require("express");
const connectToDB = require("./dbconfig/dbConnect");
require("dotenv").config();
const authController = require("./controller/authController")
const adminController = require("./controller/adminController")

const app = express();
const PORT = process.env.PORT || 5001;

connectToDB();
app.use(express.json());
app.use("/api/auth",authController)
app.use("/api/admin", adminController)
app.get("/", (req, res) => {
  res.send({
    message: "abc",
  });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
