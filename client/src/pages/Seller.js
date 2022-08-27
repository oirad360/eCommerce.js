import React from 'react'
import Product from '../components/Product'
import { useParams } from 'react-router-dom'
export default function Seller(props) {
    const [purchases, setPurchases] = React.useState([])
    const [products, setProducts] = React.useState([])
    const [username, setUsername] = React.useState(useParams().username)

    React.useEffect(() => {
        if (props.user && username === props.user.username) {
            fetch("/seller/fetchPurchases")
                .then((res) => {
                    return res.json()
                })
                .then((purchases) => {
                    setPurchases(purchases)
                })

            fetch("/seller/fetchProducts")
                .then((res) => {
                    return res.json()
                })
                .then((products) => {
                    setProducts(products)
                })
        }
    }, [])

    return (
        <article className='container flex-grow-1 py-5'>
            <h1>Pagina di {username}</h1>
            {
                props.user && username === props.user.username &&
                <React.Fragment>
                    <h1>I tuoi acquisti</h1>
                    <div className='row'>
                        {
                            purchases.length > 0 ?
                                purchases.map((product) => {
                                    console.log(product)
                                    return <div className='col-6 col-sm-4 col-md-3 col-xl-2' key={product.id}>
                                        <Product
                                            {...product}
                                            key={product.id}
                                            displayPurchase={true}
                                        />
                                    </div>
                                })
                                :
                                "Nessun risultato."
                        }
                    </div>
                </React.Fragment>
            }
        </article>
    )
}