const mysql = require('mysql')

let connection

const connect = () => {
    connection = mysql.createConnection({
        user: "root",
        host: "localhost",
        password: "",
        database: "ecommercejs"
    })
    connection.connect()
    return connection
}

const end = () => {
    connection.end()
}
module.exports = {
    connect,
    end
}