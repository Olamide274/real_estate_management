const async_handler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../Model/adminModel')
const Estate = require('../Model/estateModel')


const loginAdmin = async_handler(async(req,res) => {
    const {email,password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory");
        
    }

    const admin = await Admin.findOne({email})
    if(admin && (await bcrypt.compare(password, admin.password))){
       const accessToken = jwt.sign({
        admin:{
            username: admin.username,
            email: admin.email,
            id: admin.id
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
    const estate = Estate.findById(req.params.id)
    if(!estate){
        res.status(400)
        throw new Error("Property Not Found");
    }

    const updatedProperties =  await Estate.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(updatedProperties)
})

const deleteProperty = async_handler(async(req,res) => {
     const estate = Estate.findById(req.params.id)
    if(!estate){
        res.status(400)
        throw new Error("Property Not Found");
    }

     const deletedProperties =  await Estate.findByIdAndDelete(req.params.id, req.body, {new: true})
    res.json(deletedProperties)
})

module.exports = {loginAdmin, createProperty, updateProperty, deleteProperty}