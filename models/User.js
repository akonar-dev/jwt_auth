const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password:{
        type: String,
        unique: true
    },
    role : {
        type: String,
        enum :["admin","instructor","student"],
        default : "student"
    }

})
userSchema.pre('save', async function() {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password,20)
    }
})

module.exports = mongoose.model('User', userSchema)