const mongoose = require("mongoose")


const connectToDB = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("DB Connected");
    } catch (error) {
        console.log("DB Connection failed", error);
    }

}

module.exports = connectToDB;