const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const dbConnect = require('./config/dbConnection')
const dotenv = require('dotenv').config()
const app = express()

const port = process.env.PORT || 5100

dbConnect()


app.use(express.json())
app.use('/api/estate', require('./Routes/estateRoute'))
app.use('/api/user', require('./Routes/userRoute'))
app.use('/api/agent', require('./Routes/agentRoute'))
app.use('/api/admin', require('./Routes/adminRoute'))

app.use(errorHandler)
app.listen(port, (req,res) => {
    console.log(`Server running on port ${port}`)
})