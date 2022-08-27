const express = require('express')
const router = express.Router()
const sellerController = require('../controllers/sellerController')

router.get("/seller/fetchPurchases", sellerController.fetchPurchases)
router.get("/seller/fetchProducts", sellerController.fetchProducts)

module.exports = router