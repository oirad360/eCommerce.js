import React from 'react';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../contexts/use-auth';
import { useNavigate } from 'react-router-dom';
export default function Auth(props) {
    const auth = useAuth()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (auth.user && props.isLogin) {
            navigate("/home")
        }
    }, [auth.user, props.isLogin, navigate])
    return (
        <section style={{ minHeight: "100vh", backgroundImage: "url(assets/shutterstock_1473274019.jpg)", backgroundPosition: "center", backgroundSize: "cover" }}>
            <div style={{ minHeight: "100vh" }} className="bg-dark bg-opacity-25 d-flex align-items-center">
                <div className="container-xl">
                    <div className="row row-cols-1 row-cols-md-2 ">
                        <h1 className="col col-md-4 col-lg-6 align-self-center text-center text-white">{props.isLogin ? "Effettua il login" : "Registrati inserendo i tuoi dati"}</h1>
                        <div className="col col-md-8 col-lg-6">
                            {props.isLogin ? <LoginForm /> : <SignupForm />}
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}