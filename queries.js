// import pooling from pg
const Pool = require('pg').Pool

// create a new pool using environment variables
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DBNAME,
    password: process.env.PASSWORD,
    port: process.env.DBPORT
})

// DB QUERIES
// ========================================================

// get all users
const getUsers = (request, response) => {
    pool.query('SELECT * FROM public.users ORDER BY username ASC', (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// get user by id
const getUserByUsername = (request, response) => {
    const username = parseInt(request.params.username)
    pool.query('SELECT * FROM public.users WHERE username = $1', [username], (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// create new user
const createUser = (request, response) => {
    const { username, password } = request.body
    pool.query('INSERT INTO public.users (username, password) VALUES ($1, $2)', [username, password], (error, results) => {
        if(error){
            throw error
        }
        response.status(201).send(`User added with username: ${username}`)
    })
}

// change password
const changePassword = (request, response) => {
    const { username, password } = request.body
    pool.query('UPDATE public.users SET password = $2, password = $2 WHERE username = $1', [username, password], (error, results) => {
        if(error){
            throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
    })
}

// delete user
const deleteUser = (request, response) => {
    const username = request.params.username
    pool.query('DELETE FROM public.users WHERE username = $1', [username], (error, results) => {
        if(error){
            throw error
        }
        response.status(200).send(`User deleted with username: ${username}`)
    })
}

// ========================================================

// exports
module.exports = {
    getUsers,
    getUserByUsername,
    createUser,
    changePassword,
    deleteUser,
  }