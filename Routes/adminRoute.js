const express = require('express')
const {loginAdmin, createProperty, updateProperty, deleteProperty} = require('../Controller/adminController')
const router = express.Router()
const validateToken = require('../middleware/validateHandlerToken')


router.post('/login', loginAdmin)
router.use(validateToken)
router.route('/') .get(createProperty)
router.route('/:id') .put(updateProperty).delete(deleteProperty)

module.exports = router
