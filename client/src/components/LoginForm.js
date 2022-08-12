import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/use-auth'

export default function SignupForm() {
    const [formData, setFormData] = React.useState({
        user: "",
        password: ""
    })

    const [displayFeedback, setDisplayFeedback] = React.useState({
        user: false,
        password: false
    })

    const [serverFeedback, setServerFeedback] = React.useState("")

    function updateForm(event) {
        setFormData((oldFormData) => {
            return {
                ...oldFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    const navigate = useNavigate()

    const auth = useAuth()

    function handleSubmit(event) {
        event.preventDefault()
        if (Object.values(formData).includes("")) {
            setDisplayFeedback((oldDisplay) => {
                let newDisplay = { ...oldDisplay }
                for (const key in formData) {
                    newDisplay = {
                        ...newDisplay,
                        [key]: formData[key] === ""
                    }
                }
                return newDisplay
            })
        } else {
            auth.login(formData)
                .then((res) => {
                    if (res.user) navigate("/home")
                    else setServerFeedback(res.error ? JSON.stringify(res.error) : res.feedback)
                })
        }
    }

    function checkFields(event) {
        setDisplayFeedback((oldDisplay) => ({
            ...oldDisplay,
            [event.target.name]: event.target.value === "" ? true : false
        }))
    }

    return (
        <form className="form-floating bg-light bg-opacity-75 p-3 rounded" method='POST' onSubmit={handleSubmit}>
            <div className="input-group has-validation mb-4">
                <span className="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                    </svg>
                </span>
                <div className={"form-floating" + (displayFeedback.user ? " is-invalid" : "")} >{/*aggiungere is-invalid a className nel div e nell'input per far comparire il div invalid-feedback*/}
                    <input type="text" className={"form-control" + (displayFeedback.user ? " is-invalid" : "")} id="floatingUser" name="user" onChange={updateForm} onBlur={checkFields} placeholder="Username o email" value={formData.user} />
                    <label htmlFor="floatingUser">Username o email</label>
                </div>
                <div className="invalid-feedback">
                    Per favore inserisci un username o email.
                </div>
            </div>
            <div className="input-group has-validation mb-4">
                <span className="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
                        <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                        <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                </span>
                <div className={"form-floating" + (displayFeedback.password ? " is-invalid" : "")} >{/*aggiungere is-invalid a className nel div e nell'input per far comparire il div invalid-feedback*/}
                    <input type="password" className={"form-control" + (displayFeedback.password ? " is-invalid" : "")} id="floatingPassword" name="password" onChange={updateForm} onBlur={checkFields} placeholder="Password" value={formData.password} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="invalid-feedback">
                    Per favore inserisci una password.
                </div>
            </div>
            <p className='text-danger' style={{ overflowWrap: "break-word" }}>{/*inserire messaggio dal server*/}
                {serverFeedback}
            </p>

            <button className="btn btn-primary">Accedi</button>

            <p className='my-2'>Non sei registrato? <Link to="/signup">Registrati.</Link></p>
            <Link to="/home">Home</Link>
        </form>
    )
}