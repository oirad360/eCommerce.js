const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')

router.get("/addCart/:productId/:amount", cartController.addCart)

module.exports = router