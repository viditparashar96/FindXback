const jwt=require("jsonwebtoken")
const ErorrHandler = require("../utils/ErrorHandler")
const { catchAsyncErrors } = require("./catchAsyncErrors")

exports.isAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return next(new ErorrHandler("please login to access the resoure"))
    }
    const {id}=jwt.verify(token,process.env.JWT_SECRECT)
    
    req.id=id
    next()
})
