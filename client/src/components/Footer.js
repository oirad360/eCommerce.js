import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-primary">
            <section className="container my-4 text-white">
                <div className="row">
                    <div className="col col-6 col-sm-5 col-md-4 col-lg-3 mx-auto align-self-center">{/*è una colonna che è larga 8 fino al breakpoint sm, 5 fino al md, 4 da md in poi (non conta l'ordine in cui sono scritte le classi) */}
                        <a href="https://www.unict.it">
                            <img
                                src="/assets/logoUniCT.jpg"
                                className="w-100 rounded"
                                alt="UniCT"
                            />
                        </a>
                    </div>
                    <div className="col col-7 col-sm-5 col-md-4 col-lg-3 mx-auto mt-4 mt-sm-0 text-center text-sm-start">{/*il testo avrà text-align: "center" fino al breakpoint sm, text-align: "start" da sm in poi */}
                        <h6 className="text-uppercase fw-bold mb-4">Contatti</h6>
                        <p className='text-nowrap'><a className="text-reset text-decoration-none" href="https://www.github.com/oirad360"><i className="bi bi-github pe-2"></i>github.com/oirad360</a></p>
                        <p className='text-nowrap'><i className="bi bi-envelope-fill pe-2"></i>darioanzalone21@live.it</p>
                    </div>
                </div>
            </section>
            <div className="text-white text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                © 2022 Copyright: <span className="fw-bold">eCommerce.js</span>
            </div>
        </footer>
    )
}