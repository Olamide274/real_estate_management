const mongoose = require('mongoose')

const estateSchema = mongoose.Schema({
    Title: {
        type: String,
        required: [true, "Please add the Property Title"]
    },
    Description: {
        type: String,
        required: [true, "Please add the Property Description"]
    },
    Type: {
        type: String,
        enum: ["Apartment", "Duplex", "Bungalow", "Land"],
        required: [true, "Please add the Property Type"]
    },
    Price: {
        type: Number,
        required: [true, "Please add the Property Price"]
    },
    location: {
        city: {
            type: String,
            required: [true, "Please add the City"]
        },
        state: {
            type: String,
            required: [true, "Please add the State"]
        },
        country: {
            type: String,
            required: [true, "Please add the Country"]
        }
    },
    bedrooms: {
        type: Number,
        required: [true, "Please add the Number of Bedrooms"]
    },
    bathrooms: {
        type: Number,
        required: [true, "Please add the Number of Bathrooms"]
    },

    Status: {
        type: String,
        enum: ["Available", "Sold", "Pending"],
        required: [true, 'Please add the Property Status']
    },
    Images: {
        type: String,
        required: [true, 'Please add the Property Images']
    },
    Owner: {
        type: String,
        required: [true, 'Please add the Property Owner']
    }
}, { timestamps: true })

module.exports = mongoose.model("Estate", estateSchema)