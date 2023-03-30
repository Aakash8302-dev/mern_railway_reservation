const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel.js')
const generateToken = require('../utils/generateToken.js')


const test = asyncHandler(async(req,res) => {
    res.json({
        msg: "Amazingg"
    })
})

const register = asyncHandler(async(req,res) => {
    try {
        const {name, username, password} = req.body

        const exists = await User.findOne({username});

        if(exists){
            throw new Error("user already exists");
        }else{
            const user = await User.create({
                name,
                username,
                password
            })

            if(user){
                res.status(201).json({
                    status: "ok",
                })
            }
        }

    } catch (error) {
        res.json({
            status: "error",
            error: error.message    
        })
    }
}) 

const login = asyncHandler(async (req,res) => {
    try {

        const {username, password} = req.body;

        // check if user already exists
        const user = await User.findOne({username:username}).select('+password');
        if(!user){
            throw new Error("user does not exists");
        }

        //verify the password
        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            throw new Error("Incorrect Password")
        }else{
            res.status(201).json({
                status: "ok",
                token: generateToken(user._id),
                name: user.name,
                id: user._id
            })
        }

    } catch (error) {
        res.json({
            status: "error",
            error: error.message    
        })
    }

})

module.exports = {
    login,
    register,
    test
}