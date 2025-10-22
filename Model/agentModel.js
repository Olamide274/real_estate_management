const mongoose = require('mongoose')

const agentSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the agent name"]
    },
    email: {
        type: String,
        required: [true, "Please add the agent email"]
    },
    password: {
        type: String,
        required: [true, "Please add the agent password"]
    }
})

module.exports = mongoose.model('Agent', agentSchema)