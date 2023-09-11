const router = require("express").Router();
const userRoutes = require("./userRoutes")
const productRoutes = require("./productsRoutes")
require("dotenv").config();



router.use("/user", userRoutes)
router.use("/product", productRoutes)

// error handler
router.use((err, req, res, next) => {
    const errorObject = {};
    if (err.stack) errorObject.stack = err.stack;
    errorObject.message = err.message ?? "internal error";
    if (process.env.MODE == "production") {
        errorObject.message = "internal error"
        delete errorObject.stack;
    }
    return res.status(err.status ?? 500).json(errorObject)
})




module.exports = router;