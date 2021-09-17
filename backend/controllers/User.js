const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')

exports.getAll = asyncHandler(async (req, res) => {
    try {
        const users = await User.find()
        res.send(users);
    } catch (error) {
        res.send(error);
    }
})

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401).json({'detail': 'Invalid email or password'})
    }
})

exports.register = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body

        const userExists = await User.findOne({ email })

        if (userExists) {
            res.status(400).json({'detail': 'User already exists'})
        } else {
            const user = await User.create({
                name,
                email,
                password,
            })

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id),
                })
            } else {
                res.status(400).json({'detail': 'Invalid user data'})
            }
        }
    } catch (error) {
        res.send(error);
    }
})

exports.updateUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.id},
            req.body
        )
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

exports.deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.send(user)
    } catch (error) {
        res.send(error);
    }
})