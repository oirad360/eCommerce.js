const express = require('express')
const router = express.Router()
const signupController = require('../controllers/signupController')

router.post("/signup/checkSignup", signupController.checkSignup)
router.get("/signup/checkUsername/:username", signupController.checkUsername)
router.get("/signup/checkEmail/:email", signupController.checkEmail)

module.exports = router