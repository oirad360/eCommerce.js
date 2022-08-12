import React from 'react'
import Product from '../components/Product'
export default function Home(props) {
    const [products, setProducts] = React.useState({
        newArrivals: [],
        lastAvailables: [],
        soonAvailables: [],
        wishlist: props.user ? props.user.wishlist : null,
        all: []
    })
    React.useEffect(() => {
        fetch("home/fetchProducts")
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                setProducts((oldProducts) => ({
                    ...oldProducts,
                    all: res
                }))
            })
    }, [])
    React.useEffect(() => {
        setProducts((oldProducts) => ({
            ...oldProducts,
            wishlist: props.user ? props.user.wishlist : null
        }))
    }, [props.user])

    function toggleWishlist(action, productId) {
        fetch("/toggleWishlist/" + action + "/" + productId)
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                if (res.feedback === "ok") {
                    if (action === "remove")
                        setProducts((oldProducts) => ({
                            ...oldProducts,
                            wishlist: oldProducts.wishlist.filter(product => product.id !== productId)
                        }))
                    else setProducts((oldProducts) => ({
                        ...oldProducts,
                        wishlist: [
                            ...oldProducts.wishlist,
                            oldProducts.all.find(product => product.id === productId)
                        ]
                    }))
                }
                props.getSession()
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
            {
                products.wishlist && products.wishlist.length > 0 &&
                <section className='mb-3'>
                    <h1>La tua wishlist</h1>
                    <div className='row'>
                        {
                            products.wishlist.map((product) => {
                                return <div className='col-6 col-sm-4 col-md-3 col-xl-2' key={product.id}>
                                    <Product
                                        {...product}
                                        wishlist={true}
                                        key={product.id}
                                        userIsLogged={true}
                                        addCart={() => { addCart(product.id, "+1") }}
                                        toggleWishlist={() => { toggleWishlist("remove", product.id) }}
                                    />
                                </div>
                            })
                        }
                    </div>
                </section>
            }
            {
                products.newArrivals.length > 0 &&
                <section className='mb-3'>
                    <h1>Nuovi arrivi</h1>
                    <div className='d-flex flex-wrap'>

                    </div>
                </section>
            }
            {
                products.lastAvailables.length > 0 &&
                <section className='mb-3'>
                    <h1>Ultimi disponibili</h1>
                    <div className='d-flex flex-wrap'>

                    </div>
                </section>
            }
            {
                products.soonAvailables.length > 0 &&
                <section className='mb-3'>
                    <h1>Presto disponibili</h1>
                    <div className='d-flex flex-wrap'>

                    </div>
                </section>
            }
            <section className='mb-3'>
                <h1>Prodotti disponibili</h1>
                {
                    products.all.length ?
                        <div className='row'>
                            {
                                products.all.map((product) => {
                                    return <div className='col-6 col-sm-4 col-md-3 col-xl-2' key={product.id}>
                                        <Product
                                            {...product}
                                            wishlist={products.wishlist ? products.wishlist.some(wishlistProduct => wishlistProduct.id === product.id) : null}
                                            key={product.id}
                                            userIsLogged={props.user ? true : false}
                                            addCart={() => { addCart(product.id, "+1") }}
                                            toggleWishlist={products.wishlist ? (() => { toggleWishlist(products.wishlist.some(wishlistProduct => wishlistProduct.id === product.id) ? "remove" : "add", product.id) }) : null}
                                        />
                                    </div>
                                })
                            }
                        </div>
                        :
                        <p>Nessun risultato.</p>

                }
            </section>
        </article>
    )
}