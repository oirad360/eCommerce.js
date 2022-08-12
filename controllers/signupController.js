const bcrypt = require('bcrypt')
const { models } = require('../sequelize')
const User = models.User

const checkSignup = async (req, res) => {
    console.log("-------------signup request-------------")
    let feedback = ""
    if (req.body.name === "" || req.body.surname === "" || req.body.username === "" ||
        req.body.email === "" || req.body.password === "" || req.body.confirmPassword === "")
        feedback += "Compila tutti i campi. "

    if (/[^a-z]/i.test(req.body.name) && req.body.name !== "") feedback += "Il nome non può contenere numeri o simboli. " //if(contiene numeri o simboli)

    if (/[^a-z]/i.test(req.body.surname) && req.body.surname !== "") feedback += "Il cognome non può contenere numeri o simboli. "

    if (!/^[a-z0-9]+$/i.test(req.body.username) && req.body.username !== "") feedback += "L'username può contenere solo caratteri alfanumerici. " //if (not(contiene solo valori alfanumerici)
    else {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        if (user) feedback += "Username già in uso. "
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(req.body.email.toLowerCase()) && req.body.email !== "") feedback += "Email non valida. " //if(not(email valida))
    else {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (user) feedback += "Email già in uso. "
    }

    let passwordError = false
    if (req.body.password.length < 8 && req.body.password !== "") {
        feedback += "La password deve contenere almeno 8 caratteri. "
        passwordError = true
    }
    if (!/[a-zA-Z]/g.test(req.body.password) && req.body.password !== "") {//if(not(contiene lettere))
        feedback += "La password deve contenere almeno una lettera. "
        passwordError = true
    }
    if (!/[^a-z]/i.test(req.body.password) && req.body.password !== "") { //if(not(contiene numeri))
        feedback += "La password deve contenere almeno un numero. "
        passwordError = true
    }
    if (req.body.password !== req.body.confirmPassword && req.body.confirmPassword !== "") {
        feedback += "Le password non coincidono. "
        passwordError = true
    }
    let password
    if (!passwordError && feedback === "") {
        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(req.body.password, salt)
    }

    if (feedback === "") {
        await User.create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            username: req.body.username,
            password: password
        })
        res.send({ feedback: "ok" })
    } else res.send({ feedback: feedback })
}

const checkUsername = async (req, res) => {
    console.log("check username")
    const user = await User.findOne({
        where: {
            username: req.params.username
        }
    })
    if (user) res.send({ feedback: "used" })
    else res.send({ feedback: "ok" })
}

const checkEmail = async (req, res) => {
    console.log("check email")
    const user = await User.findOne({
        where: {
            email: req.params.email
        }
    })
    if (user) res.send({ feedback: "used" })
    else res.send({ feedback: "ok" })
}

module.exports = {
    checkSignup,
    checkEmail,
    checkUsername
}