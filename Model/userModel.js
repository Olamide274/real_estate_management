const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the Username"]
    },
    email:{
        type:String,
        required: [true, "Please add the User email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add the User password"]
    }
})

module.exports = mongoose.model('User', userSchema)