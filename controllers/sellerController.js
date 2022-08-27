const { models } = require('../sequelize')
const { Op } = require('sequelize')
const Product = models.Product
const User = models.User

const fetchPurchases = async (req, res) => {
    const user = await User.findByPk(req.session.user.id)
    const products = await user.getUserProducts({
        through: {
            where: {
                bought: {
                    [Op.gt]: 0
                }
            }
        },
        joinTableAttributes: ['bought']
    })
    let result = []
    for (const product of products) {
        const newProduct = product.toJSON()
        const user = await product.getUser({
            attributes: ['username']
        })
        newProduct.seller = user.username
        result.push(newProduct)
    }
    res.send(result)
}

const fetchProducts = async (req, res) => {
    const user = await User.findByPk(req.session.user.id)
    const products = await user.getProducts()
    res.send(products)
}

module.exports = {
    fetchPurchases,
    fetchProducts
}