const express = require('express')
const router = express.Router()

const {
    getAll,
    login, 
    register,
    updateUser,
    deleteUser,
} = require('../controllers/User')

router
    .get('/users', getAll)
    .post('/users/login', login)
    .post('/users/register', register)
    .put('/users/update/:id', updateUser)
    .delete('/users/delete/:id', deleteUser)

module.exports = router