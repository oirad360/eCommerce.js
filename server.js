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
        /* app.use((req, res, next) => {
            console.log("-----------new request:  --------------")
            console.log("host: ", req.hostname)
            console.log("path: ", req.path)
            console.log("method: ", req.method)
            console.log("---------------------------------------")
            next()
        }) */

        app.use(signupRoutes)
        app.use(loginRoutes)
        app.use(homeRoutes)
        app.use(cartRoutes)

        app.listen(PORT, () => {
            console.log("server listening on port " + PORT + "...")
            /* require('./models/User')
            require('./models/Product')
            require('./models/ProductsLocation')
            require('./models/Likes')
            require('./models/UserProduct')
            require('./models/Review')
            require('./models/Layout') */
        })
    })

