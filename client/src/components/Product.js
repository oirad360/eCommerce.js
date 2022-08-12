import React from 'react'
import { nanoid } from 'nanoid'

export default function Product(props) {
    const id = nanoid()
    return (
        <div className='d-flex flex-column align-items-center'>
            <div className="card w-100">
                <div className="card-header fw-semibold">{props.title}</div>
                <div className="card-body p-2 d-flex flex-column align-items-center">
                    <img src={props.image} className="card-img" alt="product-image" />
                    <div className='d-flex align-items-center justify-content-around w-100'>
                        {props.userIsLogged && (props.wishlist ? <i className="bi bi-heart-fill text-danger" onClick={props.toggleWishlist} style={{ cursor: "pointer" }}></i> : <i className="bi bi-heart" onClick={props.toggleWishlist} style={{ cursor: "pointer" }}></i>)}
                        <span>{props.price}€</span>
                    </div>
                    <div>Disponibilità: {props.quantity}</div>
                    {
                        props.displayCartCounter ?
                            <React.Fragment>
                                <div>Nel carrello: {props.UserProduct.cart}</div>
                                <div className='row row-cols-2 mb-2'>
                                    <div className="col-6"><button className="btn btn-danger w-100 py-0 px-4" onClick={() => { props.addCart(props.id, "-1") }}>-</button></div>
                                    <div className="col-6"><button className="btn btn-success w-100 py-0 px-4" onClick={() => { props.addCart(props.id, "+1") }}>+</button></div>
                                </div>
                            </React.Fragment>
                            :
                            (props.userIsLogged && props.quantity > 0 && <button type="button" className="btn btn-primary py-0 px-1 mb-1" onClick={props.addCart}>Aggiungi al carrello</button>)
                    }
                    <button type="button" className="btn btn-sm btn-outline-secondary py-0 px-1" data-bs-toggle="collapse" data-bs-target={"#" + id}>Scheda tecnica</button>
                </div>
                <div className="collapse" id={id}>
                    <div className="card-footer">
                        {props.description}
                    </div>
                </div>
            </div>
        </div>
    )
}