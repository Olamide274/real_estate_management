const async_handler = require('express-async-handler')
const User = require('../Model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// GET ALL PROPERTIES
// /api/user

const getProperties = async_handler(async(req,res) => {
    const user = await User.find()
    res.json(user)
})

const registerUser = async_handler(async(req,res) => {
    const {username,email,password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User already exist");
        
    }

    const hashedPassword = await bcrypt.hash(password,10)
    console.log("HashedPassword", hashedPassword)
    

    const newUser = await User.create({username,email, password: hashedPassword})
    console.log(`User created ${newUser}`)

    if(newUser){
        res.status(201).json({_id: newUser.id, email: newUser.email})
    }else{
        res.status(400)
        throw new Error("User data not Valid");
        
    }
    res.json({message: 'Register User'})
})


const loginUser = async_handler(async(req,res) => {
    const {email,password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory");
        
    }

    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
       const accessToken = jwt.sign({
        user:{
            username: user.username,
            email: user.email,
            id: user.id
        }
       },process.env.ACCESSTOKENSECRET,
        {expiresIn: "15m"}
    )
    res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("Email or Password is not valid");
        
    }
})

const currentUser = async_handler(async(req,res) => {
    res.json(req.user)
})

module.exports = {getProperties, registerUser, loginUser, currentUser}
