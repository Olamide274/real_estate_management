const { constants } = require("../constants");

const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ Title: "Validation_Error",message: err.message, stack: err.stack})
            break;
        case constants.UNAUTHORIZED:
            res.json({ Title: "Unauthorized",message: err.message, stack: err.stack})
            break;
        case constants.FORBIDDEN: 
        res.json({ Title: "Forbidden",message: err.message, stack: err.stack})
            break;
        case constants.NOT_FOUND:
            res.json({ Title: "Not_Found",message: err.message, stack: err.stack})
            break;
        case constants.SERVER_ERROR: 
        res.json({ Title: "Server_Error",message: err.message, stack: err.stack})
        default:
            console.log('All Good, No Error!!')
            break;
    }
    
}

module.exports = errorHandler