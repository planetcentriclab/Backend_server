const {Pool} = require('pg')

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "planetcentric",
    database: "weightScale"
})

module.exports = pool