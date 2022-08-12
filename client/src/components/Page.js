import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
export default function Page(props) {
    const location = useLocation()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (location.pathname === "/") navigate("/home")
    }, [location.pathname])

    return (
        <React.Fragment>
            <Header user={props.user} />
            <Outlet />
            <Footer />
        </React.Fragment>

    )
}