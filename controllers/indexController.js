const {catchAsyncErrors}=require("../middleware/catchAsyncErrors")
const Student=require("../models/studentModel")
const Internship=require("../models/internshipModel")
const Job=require("../models/jobModel")
const  bcypt=require('bcryptjs')

const ErorrHandler = require("../utils/ErrorHandler")
const { sendmail } = require("../utils/nodemailer")
const { sendtoken } = require("../utils/sendToken")
const imagekit=require('../config/imageKit').initimagekit()
const path=require('path')

exports.studentsignup=catchAsyncErrors(async(req,res,next)=>{
    const student=await Student.create(req.body)
    sendtoken(student,201,res)
    res.status(200).json(student)
})

exports.studentsignin=catchAsyncErrors(async(req,res,next)=>{
    const student=await Student.findOne({email:req.body.email}).select("+password").exec()
    if(!student){
        return next(new ErorrHandler("User not found with this email address",404))
    }
    const isMatch=student.comparePassword(req.body.password) 
    if(!isMatch){
        return next(new ErorrHandler("Wrong Credentials",401))
    }
    sendtoken(student,200,res)
    res.json({
        student
    })
})



exports.studentsignout = (req, res) => {
    // Clear the "token" cookie by setting its expiration to a past date
    res.clearCookie("token", {
        httpOnly: true,
        secure: true, // Set to true if your application is served over HTTPS
        sameSite: "none" // Adjust the sameSite attribute as needed
    });

    res.json({
        msg: "Successfully signed out"
    });
};

exports.studentsendmail=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body.email)
    const student=await Student.findOne({email:req.body.email}).exec()
    if(!student){
        return next(new ErorrHandler("User not found with this email address",404))
    }
    const url=`${req.protocol}://localhost:5173/student/forget-link/${student._id}`
    sendmail(req,res,next,url)
    student.resetPasswordToken=1;
    await student.save()
    
    
})
exports.studentforgetlink=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body)
    const student=await Student.findById(req.body.id).exec()
    if(!student){
        return next(new ErorrHandler("User not found with this email address",404))
    }
   if(student.resetPasswordToken==1){
        student.resetPasswordToken=0;
       student.password=req.body.password
       await student.save()
       res.status(200).json({
        msg:"Password has been successfully changed"
    })
    }else{
        return next(new ErorrHandler("Invalid Password link! please Try again",500))

    }


  
    
    
})



exports.studentresetpassword=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body)
   const student=await Student.findById(req.id).exec()
   student.password=req.body.password
   await student.save()
   sendtoken(student,200,res)

})

exports.studentdeleteaccount=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body)
    const pass=req.body.password
   const student=await Student.findById(req.id).select('+password')
    const  isMatch= await bcypt.compare(pass,student.password)
    if(!isMatch){
        return res.status(401).json({
            success:false,
            msg:"Fill correct password"
        })
    }
    await student.deleteOne()
    
   res.clearCookie("token")
    

    return res.status(200).json({
        success:true,
        msg:"User deleted succfully"

    })
  

})



exports.currentUser=catchAsyncErrors(async(req,res,next)=>{
    const student=await Student.findOne({_id:req.id})
    res.status(200).json({
        success:true,
        student
    })
})

exports.studentupdate=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body)
    const student= await Student.findByIdAndUpdate(req.id,{$set:req.body},{new:true})
    res.status(202).json({
        msg:"User is updated",
        student
    })
})



exports.studentavatar=catchAsyncErrors(async(req,res,next)=>{
    const student =await Student.findById(req.id).exec()
    const file=req.files.avatar
    console.log(file)
    const modifiedFileName=`resumebuilder-${Date.now()}${path.extname(file.name)}`
    if(student.avatar.fileId !==""){
        await imagekit.deleteFile(student.avatar.fileId)
    }
    const {fileId,url} =await imagekit.upload({
        file:file.data,
        fileName:modifiedFileName
    })

    student.avatar={fileId,url}
    await student.save()
    res.status(202).json({
      success:true,
      msg:"Profile pic uploaded"
    })
    
})



// ----------------------Apply intership ----------------------------

exports.applyinternship=catchAsyncErrors(async(req,res,next)=>{
    const student= await Student.findById(req.id)
    
    console.log(req.params)
    const internship= await Internship.findById(req.params.internshipid)

    const studentExist = internship.students.some(std => std.toString() === student._id.toString());
        
    if (studentExist) {
        return res.status(400).json({
            msg: "Student already exists in this job.",
            internship,
            student
        });
    }



    student.appliedinterships.push(internship)
    internship.students.push(student)
    await student.save()
    await internship.save()
    
    res.status(202).json({
        msg:"Success fully applied ",
        student
    })
})




// ----------------------Apply Job ----------------------------
exports.applyjob=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.id)
    const student= await Student.findById(req.id)
    console.log(student)
    console.log(req.params)
    const job= await Job.findById(req.params.jobid)
       
       const studentExist = job.students.some(std => std.toString() === student._id.toString());
        
       if (studentExist) {
           return res.status(400).json({
               msg: "Student already exists in this job.",
               job
           });
       }
       student.appliedjobs.push(job._id)
       job.students.push(student._id)
    await student.save()
    await job.save()
    res.status(202).json({
        msg:"Job Applied",
        student,
        job
    })
})


// ----------------------Get All  interships ----------------------------

exports.getallinternship=catchAsyncErrors(async(req,res,next)=>{
    const student= await Student.findById(req.id)
    const internship= await Internship.find().populate("createdBy")
        
 
    
    res.status(202).json({
        msg:"All internships",
        internship
    })
})




// ----------------------Get Single  intership ----------------------------

exports.getinternshipbyid=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.params.internshipid)
    const internship= await Internship.findOne({_id:req.params.internshipid}).populate("createdBy")
        
 
    
    res.status(202).json({
        msg:"Internship related to id",
        internship
    })
})



// ----------------------Get   interships by ProfileQuery ----------------------------

exports.getinternshipbyprofile=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.query.profileQuery)
    const internship= await Internship.find({profile:req.query.profileQuery}).populate("createdBy")
        
 
    
    res.status(202).json({
        msg:"Internship related to Profile query",
        internship
    })
})



// ----------------------Get   interships by locationQuery ----------------------------

exports.getinternshipbylocation=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.query)
    const internship= await Internship.find({city:req.query.locationQuery}).populate("createdBy")
        
 
    
    res.status(202).json({
        msg:"Internship related to Location query",
        internship
    })
})







// ----------------------Get All  Jobs ----------------------------

exports.getalljobs=catchAsyncErrors(async(req,res,next)=>{
    const student= await Student.findById(req.id)
    const job= await Job.find().populate("createdBy")
        
 
    
    res.status(202).json({
        msg:"All Jobs",
        job
    })
})






// ----------------------Get Single  Job ----------------------------

exports.getjobbyid=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.params.jobid)
    const job= await Job.findOne({_id:req.params.jobid}).populate("createdBy")
        
 
    
    res.status(202).json({
        msg:"Job related to id",
        job
    })
})



// ----------------------Get   Jobs by ProfileQuery ----------------------------

exports.getjobbyprofile=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.query.profileQuery)
    const job= await Job.find({profile:req.query.profileQuery}).populate("createdBy")
        
 
    
    res.status(202).json({
        msg:"Job related to Profile query",
        job
    })
})



// ----------------------Get   Job by locationQuery ----------------------------

exports.getjobbylocation=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.query)
    const job= await Job.find({city:req.query.locationQuery}).populate("createdBy")
        
 
    
    res.status(202).json({
        msg:"Job related to Location query",
        job
    })
})



// ----------------------Get All  Applications ----------------------------
exports.getallapplications=catchAsyncErrors(async(req,res,next)=>{
    const student= await Student.findById(req.id)
    .populate({
        path:"appliedinterships",
        populate:{
            path:"createdBy"
        }

    })
    .populate({
        path:"appliedjobs",
        populate:{
            path:"createdBy"
        }

    })
    
    
    
        
    // const populatedStudent = await student.populate('appliedinternships').execPopulate();
    // const populatedInternship = await internship.populate('students').execPopulate();


    
    res.status(202).json({
        msg:"All aplications",
       
       student
    //    internship: populatedInternship
    })
})



// Latest internship uplaod feed in homePage==>

exports.getlatestinternship=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.query)
    const internship= await Internship.find().sort({createdAt:-1}).limit(8).populate("createdBy")
    
 
    
    res.status(202).json({
        msg:" latest internships  found",
        internship
    })
})