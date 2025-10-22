const express = require('express')
const {createProperty, updateProperty, deleteProperty, registerAgent, loginAgent} = require('../Controller/agentController')
const router = express.Router()
const validateToken = require('../middleware/validateHandlerToken')


router.use(validateToken)
router.post('/register', registerAgent)
router.post('/login', loginAgent)
router.route('/').get(createProperty)
router.route('/:id').put(updateProperty).delete(deleteProperty)

module.exports = router