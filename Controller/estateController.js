const async_handler = require('express-async-handler')
const Estate = require('../Model/estateModel')

// GET ALL PROPERTY
// /api/estate

const getProperties = async_handler(async(req,res) => {
    const estate = await Estate.find()
    res.json(estate)
})


//CREATE PROPERTY
// /api/estate

const createProperty = async_handler(async(req,res) => {
    console.log("The request body is:", req.body)
    const {Title, Description, Type, Price,Location,bedrooms, bathrooms, Status, Images, Owner} = req.body
    if(!Title, !Description, !Type, !Price, !Location, !bedrooms, !bathrooms, !Status, !Images, !Owner){
        res.status(400)
        throw new Error("All fields are mandatory");
        
    }

    const estate = Estate.create({Title, Description, Type, Price, Location, bedrooms, bathrooms, Status, Images, Owner})
    res.json(estate)
})

// GET A PROPERTY
// /api/estate

const getProperty = async_handler(async(req,res) => {
    const estate = await Estate.findById(req.params.id)
    if(!estate){
        res.status(400)
        throw new Error("Property Not Found");
        
    }
    res.json(estate)
})

// UPDATE A PROPERTY
// /api/estate

const updateProperty = async_handler(async(req,res) => {
    const estate = findById(req.params.id)
    if(!estate){
        res.status(400)
        throw new Error("Property Not Found");
    }

    const updatedContact =  await Estate.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(updatedContact)
})


// GET A PROPERTY
// /api/estate

const deleteProperty = async_handler(async(req,res) => {
     if(!estate){
        res.status(400)
        throw new Error("Property Not Found");
    }

     const deletedContact =  await Estate.findByIdAndDelete(req.params.id, req.body, {new: true})
    res.json(deletedContact)
})


module.exports = {getProperties, createProperty, getProperty, updateProperty, deleteProperty}


