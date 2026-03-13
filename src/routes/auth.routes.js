const express  = require("express")
const { registerController, loginController, logoutController } = require("../controller/auth.controller")

const router= express.Router()
/*register api router */
router.post("/register", registerController)
/*login api router */
router.post("/login", loginController)
/*logout api router */
router.get("/logout",  logoutController)
module.exports = router