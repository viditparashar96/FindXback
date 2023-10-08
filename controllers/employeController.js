const {catchAsyncErrors}=require("../middleware/catchAsyncErrors")
const Employe=require("../models/employeModel")
const Internship=require("../models/internshipModel")
const Job=require("../models/jobModel")
const student=require("../models/studentModel")
const bcypt=require('bcryptjs')

const ErorrHandler = require("../utils/ErrorHandler")
const { sendmail } = require("../utils/nodemailer")
const { sendtoken } = require("../utils/sendToken")
const imagekit=require('../config/imageKit').initimagekit()
const path=require('path')


exports.homepage=catchAsyncErrors(async(req,res,next)=>{
    res.json({
        msg:"Secure employee homePage"
    })
})

exports.employesignup=catchAsyncErrors(async(req,res,next)=>{
    const employe=await Employe.create(req.body)
    sendtoken(employe,201,res)
    res.status(200).json(employe)
})

exports.employesignin=catchAsyncErrors(async(req,res,next)=>{
    const employe=await Employe.findOne({email:req.body.email}).select("+password").exec()
    if(!employe){
        return next(new ErorrHandler("User not found with this email address",404))
    }
    const isMatch=employe.comparePassword(req.body.password) 
    if(!isMatch){
        return next(new ErorrHandler("Wrong Credentials",401))
    }
    sendtoken(employe,200,res)
    res.json({
        employe
    })
})



exports.employesignout=catchAsyncErrors(async(req,res,next)=>{

    res.clearCookie("token")
    res.json({
        msg:"successfully signout"
    })
    
})

exports.employesendmail=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body.email)
    const employe=await Employe.findOne({email:req.body.email}).exec()
    if(!employe){
        return next(new ErorrHandler("User not found with this email address",404))
    }
    const url=`${req.protocol}://localhost:5173/employe/forget-link/${employe._id}`
    sendmail(req,res,next,url)
    employe.resetPasswordToken=1;
    await employe.save()
    
    
})
exports.employeforgetlink=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body)
    const employe=await Employe.findById(req.body.id).exec()
    if(!employe){
        return next(new ErorrHandler("User not found with this email address",404))
    }
   if(employe.resetPasswordToken==1){
        employe.resetPasswordToken=0;
       employe.password=req.body.password
       await employe.save()
       res.status(200).json({
        msg:"Password has been successfully changed"
    })
    }else{
        return next(new ErorrHandler("Invalid Password link! please Try again",500))

    }


  
    
    
})



exports.employeresetpassword=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body)
   const employe=await Employe.findById(req.id).exec()
   employe.password=req.body.password
   await employe.save()
   sendtoken(employe,200,res)

})

exports.employedeleteaccount=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body)
    const pass=req.body.password
   const employe=await Employe.findById(req.id).select('+password')
    const  isMatch= await bcypt.compare(pass,employe.password)
    if(!isMatch){
        return res.status(401).json({
            success:false,
            msg:"Fill correct password"
        })
    }
    await employe.deleteOne()
    
   res.clearCookie("token")
    

    return res.status(200).json({
        success:true,
        msg:"User deleted succfully"

    })
  

})



exports.currentUser=catchAsyncErrors(async(req,res,next)=>{
    const employe=await Employe.findOne({_id:req.id})
    res.status(200).json({
        success:true,
        employe
    })
})

exports.employeupdate=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body)
    const employe= await Employe.findByIdAndUpdate(req.id,{$set:req.body},{new:true})
    res.status(202).json({
        msg:"User is updated",
        employe
    })
})



exports.employeavatar=catchAsyncErrors(async(req,res,next)=>{
    const employe =await Employe.findById(req.id).exec()
    console.log(req.files.organizationlogo)
    const file=req.files.organizationlogo
    console.log(file)
    const modifiedFileName=`resumebuilder-${Date.now()}${path.extname(file.name)}`
    if(employe.organizationlogo.fileId !==""){
        await imagekit.deleteFile(employe.organizationlogo.fileId)
    }
    const {fileId,url} =await imagekit.upload({
        file:file.data,
        fileName:modifiedFileName
    })

    employe.organizationlogo={fileId,url}
    await employe.save()
    res.status(202).json({
        msg:"Profile pic uploaded",
        success:true,
        employe,
    })
    
})


// <------------------------------- Internship -------------------------->
exports.createinternship=catchAsyncErrors(async(req,res,next)=>{
    const employe=await Employe.findById(req.id)
        
        const intership=await Internship.create({...req.body,createdBy:employe._id})
        employe.interships.push(intership._id)
        employe.save()

        return res.status(201).json({
            success:true,
            
            msg:"Intership created",
            intership
        })
})


exports.readinternship=catchAsyncErrors(async(req,res,next)=>{
    const {interships} = await Employe.findById(req.id).populate("interships");

    res.status(200).json({
        success:true,
        msg:"Interships found to related",
        interships
    })
    
        
})



exports.readsingleinternship=catchAsyncErrors(async(req,res,next)=>{
    const internship=await Internship.findById(req.params.id)
    if(!internship){

        return new ErorrHandler("intership not found")
    }
        console.log(internship)
        
        res.status(200).json({
        success:true,
        msg:"Interships found to related",
        internship
    })
})




// <------------------------------- job -------------------------->

exports.createjob=catchAsyncErrors(async(req,res,next)=>{
    const employe=await Employe.findById(req.id)
    console.log(employe)
        console.log(req.body)
        const job=await Job.create({...req.body,createdBy:employe._id})
        employe.jobs.push(job._id)
        employe.save()

        return res.status(201).json({
            success:true,
            
            msg:"job created",
            job
        })
})



exports.readjob=catchAsyncErrors(async(req,res,next)=>{
    const {jobs} = await Employe.findById(req.id).populate("jobs");

    res.status(200).json({
        success:true,
        msg:"jobs found to related",
        jobs
    })
    
        
})



exports.readsinglejob=catchAsyncErrors(async(req,res,next)=>{
    const job=await Job.findById(req.params.id)
    if(!job){

        return new ErorrHandler("job not found")
    }
        console.log(job)
        
        res.status(200).json({
        success:true,
        msg:"Singlejob found to related",
        job
    })
})



// <------------------------------- Get All Applications -------------------------->


exports.getallapplications=catchAsyncErrors(async(req,res,next)=>{
    const employe= await Employe.findById(req.id)
    .populate({
        path:"interships",
        populate: {
            path: "students",
          },
    })
    .populate({
        path:"jobs",
        populate: {
            path: "students",
          },
    })
       
        
        res.status(200).json({
        success:true,
        msg:"All applications",
     
        employe

        
    })
})


// GET STU
// GET STUENTd dets with id for resume

exports.getstudentdets=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.params)
        const  foundstudent =await student.findOne({_id:req.params.studentid})

        return res.status(200).json({
            success:true,
            msg:"Student mil gaya",
            foundstudent
        })
})


// GET all listing of jobs and  internship

exports.getalllisting=catchAsyncErrors(async(req,res,next)=>{
    
        const employe =await Employe.findById(req.id)
        .populate("interships")
        .populate("jobs")
        return res.status(200).json({
            success:true,
            msg:"Student mil gaya",
            employe
        })
})