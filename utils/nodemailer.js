const nodemailer=require('nodemailer')
const ErorrHandler = require('./ErrorHandler')
require('dotenv').config()

exports.sendmail=(req,res,next,url)=>{
    const transporter=nodemailer.createTransport({
        service:"gmail",
        host:process.env.HOST,
        port:465,
        auth:{
            user:process.env.HOST_EMAIL,
            pass:process.env.HOST_PASSWORD
        }
    })

    const mailoption={
        from:"Vidit Pvt. Ltd ",
        to:req.body.email,
        subject:"Password Reset Link",
        // text:"Do not this link to anyone!!"
        html:`<h1>Click link below to reset password</h1>
            <a href=${url}>Password reset link</a>
        `
    }
    transporter.sendMail(mailoption,(err,info)=>{
        if(err){
            return next(new ErorrHandler(err,500))

        }
        console.log(info)
    return res.status(200).json({
        mes:"mail sent successfully",
        url
    })
    })
}