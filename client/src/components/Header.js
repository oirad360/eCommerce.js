import React from 'react'
import { Link } from 'react-router-dom'
export default function Header(props) {
    return (
        <header style={{ backgroundImage: "url(/assets/shutterstock_1216923970SPOSTATO.jpg)", backgroundSize: "cover", backgroundPosition: "center", height: "300px" }}>
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark fixed-top" style={{ "--bs-bg-opacity": ".9" }}>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-start text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body d-flex flex-column">
                            <div className='d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between'>
                                <ul className="navbar-nav d-flex flex-column flex-lg-row align-items-center ms-lg-5">
                                    <li className="nav-item">
                                        {
                                            props.user ?
                                                <div className='d-flex flex-column align-items-center me-lg-3'>
                                                    <h6>{"Benvenuto, " + props.user.username}</h6>
                                                    <Link to={"/seller/" + props.user.username}>
                                                        <button type="button" className="btn btn-outline-light p-1">
                                                            Visita la tua pagina
                                                        </button>
                                                    </Link>
                                                </div>
                                                :
                                                <Link to={"/signup"}>
                                                    <button type="button" className="btn btn-lg btn-primary my-2 mx-lg-1 my-lg-0">
                                                        Registrati
                                                    </button>
                                                </Link>
                                        }
                                    </li>
                                    <li className="nav-item">
                                        {
                                            props.user ?
                                                <Link to="/cart">
                                                    <i className="bi bi-cart position-relative fs-1 text-white">
                                                        <span className='fst-normal position-absolute' style={{ top: "30%", left: "35%", fontSize: ".8rem" }}>{props.user.cartCount}</span>
                                                    </i>
                                                </Link>
                                                :
                                                <Link to="/login">
                                                    <button type="button" className="btn btn-light my-2 mx-lg-1 my-lg-0">
                                                        Accedi
                                                    </button>
                                                </Link>
                                        }
                                    </li>
                                </ul>
                                <form>
                                    <div className="input-group my-2 my-lg-0" role="search">
                                        <button className="btn btn-light" type="submit"><i className="bi bi-search"></i></button>
                                        <input name="q" className="form-control w-50" type="search" placeholder="Cerca un prodotto" />
                                        <select name="c" className="form-select w-25 bg-light ps-1" style={{ textOverflow: "ellipsis" }}>
                                            <option value="all">Tutte le categorie</option>
                                            <option value="smartphone">Smartphones</option>
                                            <option value="laptop">Laptop</option>
                                            <option value="pc">PC</option>
                                            <option value="audio">Audio</option>
                                            <option value="tv">TV</option>
                                            <option value="photography">Fotografia</option>
                                            <option value="console">Console</option>
                                            <option value="smartwatch">Smartwatch</option>
                                            <option value="accessories">Accessori</option>
                                        </select>
                                    </div>
                                </form>
                                <div className='d-flex justify-content-center order-first order-lg-last me-lg-5'>
                                    <Link to="/home">
                                        <i className="bi bi-house-fill fs-1 fs-lg-2 text-white"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className='d-flex flex-column align-items-start d-lg-block overflow-auto' id="style-2">
                                <Link to="/" style={{ color: "white", textDecoration: "none", margin: "0px 5px" }}>Smartphones</Link>
                                <Link to="/" style={{ color: "white", textDecoration: "none", margin: "0px 5px" }}>Laptop</Link>
                                <Link to="/" style={{ color: "white", textDecoration: "none", margin: "0px 5px" }}>PC</Link>
                                <Link to="/" style={{ color: "white", textDecoration: "none", margin: "0px 5px" }}>Audio</Link>
                                <Link to="/" style={{ color: "white", textDecoration: "none", margin: "0px 5px" }}>TV</Link>
                                <Link to="/" style={{ color: "white", textDecoration: "none", margin: "0px 5px" }}>Fotografia</Link>
                                <Link to="/" style={{ color: "white", textDecoration: "none", margin: "0px 5px" }}>Console</Link>
                                <Link to="/" style={{ color: "white", textDecoration: "none", margin: "0px 5px" }}>Smartwatch</Link>
                                <Link to="/" style={{ color: "white", textDecoration: "none", margin: "0px 5px" }}>Accessori</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header >
    )
}