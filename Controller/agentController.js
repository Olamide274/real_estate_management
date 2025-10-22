const async_handler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Agent = require('../Model/agentModel')
const Estate = require('../Model/estateModel')

const createProperty = async_handler(async(req,res) => {
    console.log("The request body is:", req.body)
    const {Title, Description, Type, Price,Location,bedrooms, bathrooms, Status, Images, Owner} = req.body
    if(!Title, !Description, !Type, !Price, !Location, !bedrooms, !bathrooms, !Status, !Images, !Owner){
        res.status(400)
        throw new Error("All fields are mandatory");
        
    }

    const estate = await Estate.create({Title, Description, Type, Price,Location,bedrooms, bathrooms, Status, Images, Owner})
    res.json({estate})
})

const updateProperty = async_handler(async(req,res) => {
    const estate = findById(req.params.id)
    if(!estate){
        res.status(400)
        throw new Error("Property Not Found");
    }

    const updatedProperties =  await Estate.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(updatedProperties)
})

const deleteProperty = async_handler(async(req,res) => {
     const estate = findById(req.params.id)
    if(!estate){
        res.status(400)
        throw new Error("Property Not Found");
    }

     const deletedProperties =  await Estate.findByIdAndDelete(req.params.id, req.body, {new: true})
    res.json(deletedProperties)
})
const registerAgent = async_handler(async(req,res) => {
    const {username,email,password} = req.body
    if(!username, !email, !password){
        res.status(400)
        throw new Error("All fields are mandatory");
    }

    const agentAvailable = await Agent.findOne({email})
    if(agentAvailable){
        res.status(400)
        throw new Error("User not Found");
        
    }

    const hashedPassword = await bcrypt.hash(password,10)
    console.log("HashedPassword", hashedPassword)
    

    const newAgent = await Agent.create({username,email, password: hashedPassword})
    console.log(`Agent created ${newAgent}`)

    if(newAgent){
        res.status(201).json({_id: newAgent.id, email: newAgent.email})
    }else{
        res.status(400)
        throw new Error("Agent data not Valid");
        
    }
    res.json({message: 'Register Agent'})
})


const loginAgent = async_handler(async(req,res) => {
    const {email,password} = req.body
    if(!email, !password){
        res.status(400)
        throw new Error("All fields are mandatory");
        
    }

    const agent = await Agent.findOne({email})
    if(agent && (await bcrypt.compare(password, user.password))){
       const accessToken = jwt.sign({
        agent:{
            username: agent.username,
            email: agent.email,
            id: agent.id
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

module.exports = {createProperty, updateProperty, deleteProperty, registerAgent, loginAgent}

