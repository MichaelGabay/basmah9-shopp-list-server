const router = require("express").Router();
const { auth } = require("../middlewares/auth")
const { addProduct, updateProduct, deleteProduct, deleteAllProducts, deleteAllChecked, getProducts } = require("../controllers/productController")

router.post("/add", auth, addProduct)
router.put("/update", auth, updateProduct)
router.delete("/delete", auth, deleteProduct)
router.delete("/deleteAll", auth, deleteAllProducts)
router.delete("/deleteAllChecked", auth, deleteAllChecked)
router.get("/", auth, getProducts)

module.exports = router;