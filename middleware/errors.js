exports.generatedErrors=(err,req,res,next)=>{
    const statusCode=err.statusCode || 500

    if(err.name=="MongoServerError" && err.message.includes("E11000 duplicate key")){
        err.message="Student already exisit from this email"
    }

    res.status(statusCode).json({
        msg:err.message,
        errName:err.name,
        // stack:err.stack
    })
}