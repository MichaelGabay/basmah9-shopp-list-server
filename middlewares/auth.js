const jwt = require("jsonwebtoken")
require("dotenv").config()
const auth = (req, res, next) => {
    try {
        const token = req.header("x-api-key")
        const { _id, role } = jwt.verify(token, process.env.SECRET_KEY)
        req.user = { _id, role };
        next();
    } catch (error) {
        next({ status: 401, stack: error, message: "unauthorized" })
    }
}
module.exports = { auth }