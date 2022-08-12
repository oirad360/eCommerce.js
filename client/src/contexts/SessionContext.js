import React from 'react';

export const SessionContext = React.createContext()

const SessionContextProvider = (props) => {
    const [isLogged, setIsLogged] = React.useState()

    const login = async (formData) => {
        let res = await fetch("/checkLogin", {
            method: 'POST',
            body: JSON.stringify(formData),
            headers:
            {
                'Content-Type': 'application/json'
            }
        })
        res = await res.json()
        if (res.user) setIsLogged(true)
        return res
    }

    const logout = async () => {
        let res = await fetch("/logout")
        res = await res.json()
        if (res.message === "logout") setIsLogged(false)
        return { message: res.message }
    }

    React.useEffect(() => {
        fetch("/isLogged")
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                setIsLogged(res.isLogged)
            })

    }, [])

    return (
        <SessionContext.Provider value={{ isLogged, logout, login }}>
            {props.children}
        </SessionContext.Provider>
    )
}

export default SessionContextProvider