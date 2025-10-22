const express = require('express')
const {getProperties, registerUser,loginUser,currentUser} = require('../Controller/userController')
const router = express.Router()
const validateToken = require('../middleware/validateHandlerToken')




router.post('/register', registerUser)
router.post('/login', loginUser)
router.route('/').get(getProperties)
router.get('/current', validateToken, currentUser)


module.exports = router