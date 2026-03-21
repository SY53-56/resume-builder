const express  = require("express")
const { registerController, loginController, logoutController, getMeController } = require("../controller/auth.controller")
const {authMiddleware}  = require("../middleware/auth.Middleware")

const router= express.Router()
/*register api router */
router.post("/register", registerController)
/*login api router */
router.post("/login", loginController)
/*logout api router */
router.get("/logout",  logoutController)
router.get("/get-me", authMiddleware,getMeController)
module.exports = router