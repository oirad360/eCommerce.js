import React from 'react'
import Product from '../components/Product'
import { useNavigate } from 'react-router-dom'
export default function Cart(props) {

    const navigate = useNavigate()

    React.useEffect(() => {
        if (!props.user) navigate("/home")
    }, [])

    function toggleWishlist(action, productId) {
        fetch("/toggleWishlist/" + action + "/" + productId)
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                if (res.feedback === "ok") props.getSession()
            })
    }

    function addCart(productId, amount) {
        fetch("/addCart/" + productId + "/" + amount)
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                if (res.feedback === "ok") props.getSession()
            })
    }
    return (
        <article className='container flex-grow-1 py-5'>
            <h1>Il tuo carrello</h1>
            <div className='row mb-5'>
                {
                    props.user &&
                        props.user.cart.length > 0 ?
                        props.user.cart.map((product) => {
                            return <div className='col-6 col-sm-4 col-md-3 col-xl-2' key={product.id}>
                                <Product
                                    {...product}
                                    key={product.id}
                                    wishlist={props.user.wishlist.some(wishlistProduct => wishlistProduct.id === product.id)}
                                    userIsLogged={props.user ? true : false}
                                    displayCartCounter={true}
                                    addCart={addCart}
                                    toggleWishlist={() => { toggleWishlist(props.user.wishlist.some(wishlistProduct => wishlistProduct.id === product.id) ? "remove" : "add", product.id) }}
                                />
                            </div>
                        })
                        :
                        "Nessun risultato."
                }
            </div>
            <button className="btn btn-primary btn-large">
                Ordina
            </button>
        </article>
    )
}