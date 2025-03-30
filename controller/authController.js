const express = require("express")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router()

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  res.status(201).send({
    message: "User Registered",
    user,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  console.log(user);
  console.log(password);
  console.log(user.password);

  const isMatching = await bcrypt.compare(password, user.password);
  console.log(isMatching);

  if (!isMatching) {
    res.status(404).send({
      message: "Invalid password",
    });
  } else {
    const token = jwt.sign({ ...user, id: user._id }, process.env.SECRET_KEY);
    res.status(201).send({
      message: "Logged In",
      user,
      token,
    });
  }
});
// router.get("/users",auth,async (req,res)=>{
//   const data = await User.find({})
//   res.status(200).json({
//     data
//   })
// })

module.exports = router;