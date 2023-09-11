const productModel = require("../models/productModel")
require("dotenv").config()
const productCtrl = {
    async addProduct(req, res, next) {
        try {
            req.body.userId = req.user._id
            await productModel.create(req.body);
            res.status(201).json({ message: "product created successfully" })
        } catch (error) {
            next({ stack: error, message: "faild adding" })
        }
    },
    async updateProduct({ query, body, user }, res, next) {
        try {
            const { modifiedCount } = await productModel.updateOne({ _id: query._id, userId: user._id }, body)
            if (modifiedCount == 1) {
                return res.status(200).json({ message: "product created successfully" })
            }
            next({ message: "faild updating" })
        } catch (error) {
            next({ stack: error, message: "faild updating" })
        }
    },
    async deleteProduct({ query, user }, res, next) {
        try {
            const { deletedCount } = await productModel.deleteOne({ _id: query._id, userId: user._id })
            if (deletedCount == 1) {
                return res.status(202).json({ message: "product deleted successfully" })
            }
        } catch (error) {
            next({ stack: error, message: "faild deleting" })
        }
    },
    async deleteAllProducts({ user }, res, next) {
        try {
            await productModel.deleteMany({ userId: user._id })
            return res.status(202).json({ message: "products deleted successfully" })

        } catch (error) {
            next({ stack: error, message: "faild deleting" })
        }
    },
    async deleteAllChecked({ user }, res, next) {
        try {
            await productModel.deleteMany({ userId: user._id, checked: true })
            return res.status(202).json({ message: "products deleted successfully" })
        } catch (error) {
            next({ stack: error, message: "faild deleting" })
        }
    },
    async getProducts({ query, user }, res, next) {
        const { limit, offset } = query
        try {
            let products = []
            if (limit) {
                products = await productModel.find({ userId: user._id }).sort({ createdAt: -1 }).limit(limit).skip(offset || 0)
            }
            else {
                products = await productModel.find({ userId: user._id }).sort({ createdAt: -1 })
                return res.status(200).json(products)
            }
            return res.status(200).json({
                products,
                next: process.env.SERVER_URL + `product/?limit=${limit}&offset=${parseInt(limit) + (parseInt(offset) || 0)}`
            })
        } catch (error) {
            next({ stack: error, message: "faild to get" })
        }
    }


}

module.exports = productCtrl