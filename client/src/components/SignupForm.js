import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/use-auth'
export default function SignupForm() {
    const auth = useAuth()

    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        name: "",
        surname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    })

    const [displayFeedback, setDisplayFeedback] = React.useState({
        name: {
            empty: {
                display: false,
                value: "Per favore inserisci un nome. "
            },
            invalid: {
                display: false,
                value: "Il nome non può contenere numeri o simboli. "
            }
        },
        surname: {
            empty: {
                display: false,
                value: "Per favore inserisci un cognome. "
            },
            invalid: {
                display: false,
                value: "Il cognome non può contenere numeri o simboli. "
            }
        },
        username: {
            empty: {
                display: false,
                value: "Per favore inserisci un username. "
            },
            invalid: {
                display: false,
                value: "L'username può contenere solo caratteri alfanumerici. "
            },
            used: {
                display: false,
                value: "Username già in uso. "
            }
        },
        email: {
            empty: {
                display: false,
                value: "Per favore inserisci un email. "
            },
            invalid: {
                display: false,
                value: "Email non valida "
            },
            used: {
                display: false,
                value: "Email già in uso. "
            }
        },
        password: {
            empty: {
                display: false,
                value: "Per favore inserisci una password. "
            },
            length: {
                display: false,
                value: "La password deve contenere almeno 8 caratteri. "
            },
            letter: {
                display: false,
                value: "La password deve contenere almeno una lettera. "
            },
            number: {
                display: false,
                value: "La password deve contenere almeno un numero. "
            }
        },
        confirmPassword: {
            empty: {
                display: false,
                value: "Per favore conferma la password. "
            },
            invalid: {
                display: false,
                value: "Le password non coincidono. "
            }
        }
    })

    const [serverFeedback, setServerFeedback] = React.useState("")

    const [submit, setSubmit] = React.useState(false)

    React.useEffect(() => {
        if (submit) {
            let isValid = true
            for (const key in displayFeedback)
                for (const key1 in displayFeedback[key])
                    if (displayFeedback[key][key1].display) {
                        isValid = false
                        break
                    }
            if (isValid)
                fetch("/signup/checkSignup", {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        if (res.feedback === "ok") {
                            auth.logout()
                                .then((res) => {
                                    if (res.feedback === "logout") navigate("/login")
                                })
                        } else setServerFeedback(res.error ? JSON.stringify(res.error) : res.feedback)
                    })
            else setSubmit(false)
        }
    }, [submit])

    function updateForm(event) {
        setFormData((oldFormData) => {
            return {
                ...oldFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    function checkName(name) {
        setDisplayFeedback((oldDisplay) => {
            const res = {
                ...oldDisplay,
                name: {
                    invalid: {
                        ...oldDisplay.name.invalid,
                        display: (/[^a-z]/i.test(name))
                    },
                    empty: {
                        ...oldDisplay.name.empty,
                        display: name === ""
                    }
                }
            }
            return res
        })
    }

    function checkSurname(surname) {
        setDisplayFeedback((oldDisplay) => {
            const res = {
                ...oldDisplay,
                surname: {
                    ...oldDisplay.surname,
                    empty: {
                        ...oldDisplay.surname.empty,
                        display: surname === ""
                    },
                    invalid: {
                        ...oldDisplay.surname.invalid,
                        display: (/[^a-z]/i.test(surname))
                    }
                }
            }
            return res
        })
    }

    async function checkUsername(username) {
        setDisplayFeedback((oldDisplay) => {
            const res = {
                ...oldDisplay,
                username: {
                    empty: {
                        ...oldDisplay.username.empty,
                        display: username === ""
                    },
                    invalid: {
                        ...oldDisplay.username.invalid,
                        display: (!/^[a-z0-9]+$/i.test(username) && username !== "")
                    },
                    used: {
                        ...oldDisplay.username.used,
                        display: false
                    }
                }
            }
            return (res)
        })
        if (/^[a-z0-9]+$/i.test(username) && username !== "") {
            await fetch("signup/checkUsername/" + username)
                .then((res) => {
                    return res.json()
                })
                .then((res) => {
                    if (res.feedback !== "ok") {
                        setDisplayFeedback((oldDisplay) => {
                            const res = {
                                ...oldDisplay,
                                username: {
                                    ...oldDisplay.username,
                                    used: {
                                        ...oldDisplay.username.used,
                                        display: true
                                    }
                                }
                            }
                            return res
                        })
                    }
                })
        }
    }

    async function checkEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        setDisplayFeedback((oldDisplay) => {
            const res = {
                ...oldDisplay,
                email: {
                    empty: {
                        ...oldDisplay.email.empty,
                        display: email === ""
                    },
                    invalid: {
                        ...oldDisplay.email.invalid,
                        display: (!re.test(email.toLowerCase()) && email !== "")
                    },
                    used: {
                        ...oldDisplay.email.used,
                        display: false
                    }
                }
            }
            return res
        })
        if (re.test(email.toLowerCase())) {
            await fetch("signup/checkEmail/" + email)
                .then((res) => {
                    return res.json()
                })
                .then((res) => {
                    if (res.feedback !== "ok") {
                        setDisplayFeedback((oldDisplay) => {
                            const res = {
                                ...oldDisplay,
                                email: {
                                    ...oldDisplay.email,
                                    used: {
                                        ...oldDisplay.email.used,
                                        display: true
                                    }
                                }
                            }
                            return res
                        })
                    }
                })
        }
    }

    function checkPassword(password) {
        setDisplayFeedback((oldDisplay) => {
            const res = {
                ...oldDisplay,
                password: {
                    empty: {
                        ...oldDisplay.password.empty,
                        display: password === ""
                    },
                    length: {
                        ...oldDisplay.password.length,
                        display: (password.length < 8 && password !== "")
                    },
                    letter: {
                        ...oldDisplay.password.letter,
                        display: (!/[a-zA-Z]/g.test(password) && password !== "")
                    },
                    number: {
                        ...oldDisplay.password.number,
                        display: (!/[^a-z]/i.test(password) && password !== "")
                    }
                }
            }
            return res
        })
    }

    function checkConfirmPassword(confirmPassword) {
        setDisplayFeedback((oldDisplay) => {
            const res = {
                ...oldDisplay,
                confirmPassword: {
                    empty: {
                        ...oldDisplay.confirmPassword.empty,
                        display: confirmPassword === ""
                    },
                    invalid: {
                        ...oldDisplay.confirmPassword.invalid,
                        display: confirmPassword !== formData.password && confirmPassword !== ""
                    }
                }
            }
            return res
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        checkName(formData.name)
        checkSurname(formData.surname)
        checkPassword(formData.password)
        checkConfirmPassword(formData.confirmPassword)
        await checkEmail(formData.email)
        await checkUsername(formData.username)
        setSubmit(true)
    }

    function feedback(field) {
        let feedback = ""
        for (const key in displayFeedback[field])
            if (displayFeedback[field][key].display)
                feedback += displayFeedback[field][key].value
        return feedback
    }

    return (
        <form className="form-floating bg-light bg-opacity-75 p-3 rounded" onSubmit={handleSubmit}>
            <div className="row mb-4 g-1">
                <div className="col">
                    <div className="input-group has-validation">
                        <span className="input-group-text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-badge" viewBox="0 0 16 16">
                                <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />
                            </svg>
                        </span>
                        <div className={"form-floating" + ((Object.values(displayFeedback.name).filter((obj) => obj.display)).length > 0 ? " is-invalid" : "")} >{/*aggiungere is-invalid a className nel div e nell'input per far comparire il div invalid-feedback*/}
                            <input type="text" className={"form-control" + ((Object.values(displayFeedback.name).filter((obj) => obj.display)).length > 0 ? " is-invalid" : "")} id="floatingName" name="name" onChange={updateForm} onBlur={() => checkName(formData.name)} placeholder="Nome" value={formData.name} />
                            <label htmlFor="floatingName">Nome</label>
                        </div>
                        <div className="invalid-feedback">
                            {
                                feedback("name")
                            }
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="input-group has-validation">
                        <span className="input-group-text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-badge-fill" viewBox="0 0 16 16">
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z" />
                            </svg>
                        </span>
                        <div className={"form-floating" + ((Object.values(displayFeedback.surname).filter((obj) => obj.display)).length > 0 ? " is-invalid" : "")} >{/*aggiungere is-invalid a className nel div e nell'input per far comparire il div invalid-feedback*/}
                            <input type="text" className={"form-control" + ((Object.values(displayFeedback.surname).filter((obj) => obj.display)).length > 0 ? " is-invalid" : "")} id="floatingSurname" name="surname" onChange={updateForm} onBlur={() => checkSurname(formData.surname)} placeholder="Cognome" value={formData.surname} />
                            <label htmlFor="floatingSurname">Cognome</label>
                        </div>
                        <div className="invalid-feedback">
                            {
                                feedback("surname")
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="input-group has-validation mb-4">
                <span className="input-group-text">@</span>
                <div className={"form-floating" + ((Object.values(displayFeedback.email).filter((obj) => obj.display)).length > 0 ? " is-invalid" : "")} >{/*aggiungere is-invalid a className nel div e nell'input per far comparire il div invalid-feedback*/}
                    <input type="text" className={"form-control" + ((Object.values(displayFeedback.email).filter((obj) => obj.display)).length > 0 ? " is-invalid" : "")} id="floatingEmail" name="email" onChange={updateForm} onBlur={() => checkEmail(formData.email)} placeholder="Email" value={formData.email} />
                    <label htmlFor="floatingEmail">Email</label>
                </div>
                <div className="invalid-feedback">
                    {
                        feedback("email")
                    }
                </div>
            </div>
            <div className="input-group has-validation mb-4">
                <span className="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                    </svg>
                </span>
                <div className={"form-floating" + ((Object.values(displayFeedback.username).filter((obj) => obj.display)).length > 0 ? " is-invalid" : "")} >{/*aggiungere is-invalid a className nel div e nell'input per far comparire il div invalid-feedback*/}
                    <input type="text" className={"form-control" + ((Object.values(displayFeedback.username).filter((obj) => obj.display)).length > 0 ? " is-invalid" : "")} id="floatingUsername" name="username" onChange={updateForm} onBlur={() => checkUsername(formData.username)} placeholder="Username" value={formData.username} />
                    <label htmlFor="floatingUsername">Username</label>
                </div>
                <div className="invalid-feedback">
                    {
                        feedback("username")
                    }
                </div>
            </div>
            <div className="input-group has-validation mb-4">
                <span className="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
                        <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                        <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                </span>
                <div className={"form-floating" + ((Object.values(displayFeedback.password).filter((obj) => obj.display)).length > 0 ? " is-invalid" : "")} >{/*aggiungere is-invalid a className nel div e nell'input per far comparire il div invalid-feedback*/}
                    <input type="password" className={"form-control" + ((Object.values(displayFeedback.password).filter((obj) => obj.display)).length > 0 ? " is-invalid" : "")} id="floatingPassword" name="password" onChange={updateForm} onBlur={() => checkPassword(formData.password)} placeholder="Password" value={formData.password} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="invalid-feedback">
                    {
                        feedback("password")
                    }
                </div>
            </div>
            <div className="input-group has-validation mb-4">
                <span className="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16">
                        <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                    </svg>
                </span>
                <div className={"form-floating" + ((Object.values(displayFeedback.confirmPassword).filter((obj) => obj.display)).length > 0 ? " is-invalid" : "")} >{/*aggiungere is-invalid a className nel div e nell'input per far comparire il div invalid-feedback*/}
                    <input type="password" className={"form-control" + ((Object.values(displayFeedback.confirmPassword).filter((obj) => obj.display)).length > 0 ? " is-invalid" : "")} id="floatingConfirmPassword" name="confirmPassword" onChange={updateForm} onBlur={() => checkConfirmPassword(formData.confirmPassword)} placeholder="Conferma password" value={formData.confirmPassword} />
                    <label htmlFor="floatingConfirmPassword">Conferma password</label>
                </div>
                <div className="invalid-feedback">
                    {
                        feedback("confirmPassword")
                    }
                </div>
            </div>
            <div className="input-group mb-4">
                <span className="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
                        <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    </svg>
                </span>
                <input type="file" className="form-control" aria-label="file example" />
                <div className="invalid-feedback">Example invalid form file feedback</div>
            </div>
            <button className="btn btn-primary">Registrati</button>
            <p className="text-danger" style={{ overflowWrap: "break-word" }}>{/*inserire messaggio dal server*/}
                {serverFeedback}
            </p>
            <p className='my-2'>Sei già registrato? <Link to="/login">Accedi.</Link></p>
            <Link to="/home">Home</Link>
        </form>
    )
}
