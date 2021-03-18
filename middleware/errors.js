const { JsonWebTokenError } = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    })
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err }

    error.message = err.message;

    //wrong mongoose object ID error
    if(err.name === 'CastError'){
      const message = `Resource not found. Invalid: ${err.path}`
      error= new ErrorHandler(message,400)
    }

    //handling mongoose validation error

    if(err.message==='ValidationError'){
      const name= Object.values(err.errors).map(value => value.message);
      error = new ErrorHandler(message,400)
    }

    //handling mongoose duplicate key error
    if(err.code === 11000){
      const message =`Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message,400)
    }

    //handling wrong jwt token
    if(err.name === 'JsonWebTokenError'){
      const message = 'Json web token is invalid.Try again!!!';
      error = new ErrorHandler(message,400)
    }

    //handling expired jwt token
    if(err.name === 'TokenExpiredError'){
      const message ='json web token is expired.Try again!!!';
      error = new ErrorHandler(message,400 )
    }
    

    res.status(err.statusCode).json({
      success: false,
      message : err.message || "Internal server error"
    });
  }

  
};
