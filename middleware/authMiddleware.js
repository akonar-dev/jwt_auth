const jwt = require('jsonwebtoken')
const User = require("../models/User")

const auth = (roles = []) => {
    return async (req,res,next) => {
        try {
            const token = req.authorisation.headers
            if(!token || !token.startsWith("Bearer ")) {
                return res.status(401).json({
                    message: "No token provided"
                })
            }
            const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY)
            const id = decoded._id
            const user = await User.findById(id)
            req.user = user
            if(roles.length && !roles.includes(request.user.role)) {
                res.status(403).json({
                message: "Unauthorised access"
                })
            }
            next();
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = auth