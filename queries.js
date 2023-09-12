// import pooling from pg
const pool = require('pg').Pool

// create a new pool using environment variables
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DBNAME,
    password: process.env.PASSWORD,
    port: process.env.DBPORT
})

// QUERIES
// ========================================================

// get all users
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY username ASC', (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// get user by id
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// create new user
const createUser = (request, response) => {
    const { username, password } = request.body
    pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password], (error, results) => {
        if(error){
            throw error
        }
        response.status(201).send(`User added with username: ${result.insertId}`)
    })
}