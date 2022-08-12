const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')

router.post("/login/checklogin", loginController.checkLogin)
router.get("/login/getSession", loginController.getSession)
router.get("/logout", loginController.logout)

module.exports = router