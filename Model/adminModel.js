const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please add your username"]
    },
    password:{
        type: String,
        required: [true, "Please add your password"]
    }
})

module.exports = mongoose.model('Admin', adminSchema)