const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController')

router.get("/home/fetchProducts", homeController.fetchProducts)
router.get("/toggleWishlist/:action/:productId", homeController.toggleWishlist)
module.exports = router