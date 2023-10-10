require("dotenv").config()
exports.sendtoken=(user,statuscode,res)=>{
    const token=user.getjwttoken()
    const options={
        expires:new Date(Date.now()+ process.env.COOKIE_EXPIRE *24 *60 * 60* 1000 ),
        httpOnly:true,
        secure: true,
        // sameSite: 'none',
    }
    res.status(statuscode).cookie("token",token,options).json({
        success:true,
        msg:"Logged in successfully!",
        id:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        avatar:user.avatar,
        organizationlogo:user.organizationlogo,
        role:user.role,
        token
    })
}