const mongoose = require('mongoose')
require("dotenv").config()

const internshipModel = new mongoose.Schema({
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"student"
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employe"
    },
    profile: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    skills:String,
    intershipType: {
        type: String,
        required: true,
        enum:["in-office/Hybird","Remote"]
    },
   openings:String,
   from:String,
   to:String,
   duration:String,
   responsibility:String,
   stipend:{
    status:{
        type: String,
        
        enum:["Fixed","Negotiable","Performance based","Unpaid"]
    },
    amount:String
    
   },

   perks:String,
   assesments:String





}, { timestamps: true })





module.exports = mongoose.model("Internship", internshipModel)