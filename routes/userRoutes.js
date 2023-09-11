const router = require("express").Router();
const { signup, login, getUser } = require("../controllers/userController")
const { auth } = require("../middlewares/auth")


router.post("/signup", signup);

router.post("/login", login)

router.get("/checkAuth", auth, getUser)




module.exports = router;