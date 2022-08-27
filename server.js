const PORT = 3001
const express = require('express')
const session = require('express-session')
const { initialize } = require('./sequelize')
const app = express()

initialize()
    .then(() => {
        const signupRoutes = require('./routes/signupRoutes')
        const loginRoutes = require('./routes/loginRoutes')
        const homeRoutes = require('./routes/homeRoutes')
        const cartRoutes = require('./routes/cartRoutes')
        const sellerRoutes = require('./routes/sellerRoutes')
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            res.setHeader("Access-Control-Allow-Headers", "Content-Type")
            next()
        })
        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())
        app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true
        }))

        app.use(signupRoutes)
        app.use(loginRoutes)
        app.use(homeRoutes)
        app.use(cartRoutes)
        app.use(sellerRoutes)

        app.listen(PORT, () => {
            console.log("server listening on port " + PORT + "...")
        })
    })

