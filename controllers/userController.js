const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const userCtrl = {
    async signup({ body }, res, next) {
        try {
            body.password = await bcrypt.hash(body.password, 10)
            const user = await userModel.create(body);
            user.password = "******"
            res.status(201).json({ user, message: "user created successfully" })
        } catch (error) {
            if (error.code == 11000) {
                return next({ status: 403, message: "duplicate email", stack: error })
            }
            next({ stack: error })
        }
    },
    async login({ body }, res, next) {
        try {
            const user = await userModel.findOne({ email: body.email })
            if (!user) {
                return next({ status: 404, message: "user not found" })
            }
            if (!await bcrypt.compare(body.password, user.password)) {
                return next({ status: 401, message: "wrong password" })
            }

            const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "30d" })
            user.password = "******";
            return res.status(200).json({ user: user, message: "user logged in successfully", token: token })
        } catch (error) {
            next({ stack: error })
        }
    },
    async getUser({ user }, res, next) {
        try {
            const currUser = await userModel.findOne({ _id: user._id })
            currUser.password = "****"
            res.status(200).json(currUser)
        } catch (error) {
            next({ stack: error })
        }
    }

}

module.exports = userCtrl