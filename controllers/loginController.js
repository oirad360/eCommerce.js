const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const { models } = require('../sequelize')
const User = models.User

const checkLogin = async (req, res) => {

    console.log("-------------login request-------------")
    console.log("from: " + req.body.user)
    const user = await User.findOne({
        where: {
            [Op.or]: [
                { username: req.body.user },
                { email: req.body.user }
            ]
        }
    })
    if (user) {
        const isValid = await bcrypt.compare(req.body.password, user.password)
        if (isValid) {
            const wishlist = await user.getUserProducts({
                through: {
                    where: {
                        wishlist: true
                    }
                },
                joinTableAttributes: []
            })
            const cart = await user.getUserProducts({
                through: {
                    where: {
                        cart: {
                            [Op.gt]: 0
                        }
                    }
                },
                joinTableAttributes: ['cart']
            })
            req.session.user = { id: user.id, username: user.username, cartCount: user.cartItems, cart: cart, wishlist: wishlist }
            req.session.save()
            res.send({ user: { username: user.username, cartCount: user.cartItems, cart: cart, wishlist: wishlist } })
        } else res.send({ feedback: "Credenziali errate, riprova." })
    } else res.send({ feedback: "Credenziali errate, riprova." })
}

const logout = (req, res) => {
    req.session.destroy(() => {
        res.send({ feedback: "logout" })
    })
}

const getSession = async (req, res) => {
    if (req.session.user) {
        const user = await User.findByPk(req.session.user.id)
        const wishlist = await user.getUserProducts({
            through: {
                where: {
                    wishlist: true
                }
            },
            joinTableAttributes: []
        })
        const cart = await user.getUserProducts({
            through: {
                where: {
                    cart: {
                        [Op.gt]: 0
                    }
                }
            },
            joinTableAttributes: ['cart']
        })
        /* const connection = db.connect()
        const query = util.promisify(connection.query).bind(connection);
        const wishlist = await query("select products.id, title, image, price, description, quantity, products.userid, category, producer, date from products join user_product on productid=products.id where wishlist=true and user_product.userid=?", [req.session.user.id])
        const cart = await query("select products.id, title, image, price, description, quantity, products.userid, category, producer, date, cart from products join user_product on productid=products.id where cart>0 and user_product.userid=?", [req.session.user.id])
        let cartCount = 0
        for (const item of cart) {
            cartCount += item.cart
        }*/
        req.session.user = { ...req.session.user, cartCount: user.cartItems, cart: cart, wishlist: wishlist }
        req.session.save()
        res.send({ user: { username: req.session.user.username, cartCount: user.cartItems, cart: cart, wishlist: wishlist } })
        //db.end()
    }
    else res.send({ user: false })
}

module.exports = {
    checkLogin,
    logout,
    getSession
}