const { models } = require('../sequelize')
const { Op } = require('sequelize')
const Product = models.Product
const User = models.User

const addCart = async (req, res) => {
    /**
     * $product=Product::find($productID);
        $user=$product->user_product()->where('user_id',session('id'))->first();
        $quantity=$product->quantity;
        if($val==="true"){
            if($quantity>0){
                if(!isset($user)){
                    $product->user_product()->attach(session('id'),["wishlist"=>false,"bought"=>false,"cart"=>1]);
                    return 1;
                }
                if($user->pivot->cart<$quantity){
                    $product->user_product()->updateExistingPivot(session('id'),["cart"=>$user->pivot->cart+1]);
                    return 1;
                }
                return 0;
            }
            return 0;
        } else {
            $product->user_product()->updateExistingPivot(session('id'),["cart"=>$user->pivot->cart-1]);
            if($user->pivot->cart==0 && $user->pivot->bought==0 && $user->pivot->wishlist==false) $product->user_product()->detach(session('id'));
            return -1;
        }
     */
    console.log("----------------------------------------------")
    const user = await User.findByPk(req.session.user.id)
    const quantity = (await Product.findByPk(req.params.productId, { attributes: ['quantity'] })).quantity

    if (req.params.amount === "+1") {
        const product = await user.getUserProducts({
            through: {
                where: {
                    productId: req.params.productId
                }
            }
        })
        if (product[0]) {
            if (product[0].UserProduct.cart < quantity) {
                await user.addUserProducts(parseInt(req.params.productId), { through: { cart: product[0].UserProduct.cart + 1 } })
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
                const cartCount = (await User.findByPk(req.session.user.id)).cartItems
                req.session.user = { ...req.session.user, cartCount: cartCount, cart: cart }
                req.session.save()
                res.send({ feedback: "ok" })
            } else res.send({ feedback: "selected amount exceeds product's quantity" })
        } else {
            await user.addUserProducts(parseInt(req.params.productId), { through: { cart: 1 } })
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
            req.session.user = { ...req.session.user, cartCount: (req.session.user.cartCount + 1), cart: cart }
            req.session.save()
            res.send({ feedback: "ok" })
        }

    } else if (req.params.amount === "-1") {
        const product = await user.getUserProducts({
            through: {
                where: {
                    productId: req.params.productId
                }
            }
        })
        await user.addUserProducts(parseInt(req.params.productId), { through: { cart: product[0].UserProduct.cart - 1 } })
        if (product[0].UserProduct.wishlist === false && product[0].UserProduct.cart - 1 === 0 && product[0].UserProduct.bought === 0) await user.removeUserProducts(parseInt(req.params.productId))
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
        req.session.user = { ...req.session.user, cartCount: (req.session.user.cartCount - 1), cart: cart }
        req.session.save()
        res.send({ feedback: "ok" })
    } else if (req.params.amount < quantity) {
        await user.addUserProducts(parseInt(req.params.productId), { through: { cart: parseInt(req.params.amount) } })
        const product = await user.getUserProducts({
            through: {
                where: {
                    productId: req.params.productId
                }
            }
        })
        if (product[0].UserProduct.wishlist === false && product[0].UserProduct.cart === 0 && product[0].UserProduct.bought === 0) await user.removeUserProducts(parseInt(req.params.productId))
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
        const cartCount = (await User.findByPk(req.session.user.id)).cartItems
        req.session.user = { ...req.session.user, cartCount: cartCount, cart: cart }
        req.session.save()
        res.send({ feedback: "ok" })
    } else res.send({ feedback: "selected amount exceeds product's quantity" })

}

module.exports = {
    addCart
}