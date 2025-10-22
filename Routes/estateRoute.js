const express = require('express')
const {getProperties,createProperty,getProperty,updateProperty,deleteProperty} = require('../Controller/estateController')
const router = express.Router()
const validateToken = require('../middleware/validateHandlerToken')

router.use(validateToken)
router.route("/").get(getProperties).post(createProperty)
router.route('/:id') .get(getProperty).put(updateProperty).delete(deleteProperty)


module.exports = router