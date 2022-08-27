const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')

router.get("/addCart/:productId/:amount", cartController.addCart)
router.get("/cart/buy", cartController.buy)

module.exports = router