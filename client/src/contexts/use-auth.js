import React, { useState, useEffect, useContext, createContext } from "react";

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null)

    const login = (formData) => {
        return fetch("/login/checkLogin", {
            method: 'POST',
            body: JSON.stringify(formData),
            headers:
            {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json()
        }).then((res) => {
            if (res.user) {
                setUser(res.user)
                return { user: res.user }
            } else {
                setUser(null)
                return res
            }
        })
    }

    const logout = () => {
        return fetch("/logout")
            .then((res) => {
                return res.json()
            }).then((res) => {
                if (res.feedback === "logout") setUser(null)
                return res
            })
    }

    const getSession = () => {
        return fetch("/login/getSession")
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                if (res.user) {
                    setUser(res.user)
                    return { user: res.user }
                } else {
                    setUser(null)
                    return { user: false }
                }
            })
    }

    useEffect(() => {
        getSession()
    }, [])
    return {
        user,
        login,
        logout,
        getSession
    };
}