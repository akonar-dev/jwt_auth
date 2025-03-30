const express = require("express")
const User = require("../models/User")
const router = express.Router();
const auth = require("../middleware/authMiddleware")

router.get("/users",auth(['admin']),async (req,res)=>{
  const users = await User.find({})
  res.status(200).json({
    users
  })
})

module.exports = router