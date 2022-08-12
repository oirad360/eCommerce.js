const { models } = require('../sequelize')
const Product = models.Product
const User = models.User

const fetchProducts = async (req, res) => {
    const products = await Product.findAll()
    res.send(products)
}

const toggleWishlist = async (req, res) => {
    const user = await User.findByPk(req.session.user.id)

    await user.addUserProducts(parseInt(req.params.productId), { through: { wishlist: req.params.action === "add" } })
    if (req.params.action === "remove") {
        const product = await user.getUserProducts({
            through: {
                where: {
                    productId: req.params.productId
                }
            },
        })
        if (product[0].UserProduct.cart === 0 && product[0].UserProduct.bought === 0) await user.removeUserProducts(parseInt(req.params.productId))
    }
    const wishlist = await user.getUserProducts({
        through: {
            where: {
                wishlist: true
            }
        },
        joinTableAttributes: []
    })
    req.session.user = { ...req.session.user, wishlist: wishlist }
    req.session.save()
    res.send({ feedback: "ok" })
}


module.exports = {
    fetchProducts,
    toggleWishlist
}