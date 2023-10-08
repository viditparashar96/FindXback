const mongoose = require('mongoose')
require("dotenv").config()

const jobModel = new mongoose.Schema({
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
    skills: String,
    jobType: {
        type: String,
        required: true,
        enum: ["in-office/Hybird", "Remote"]
    },
    openings: String,
    description: String,
    preferences: String,
    salaryFrom: String,
    salaryTo: String,
    expirence:String,
    city:String,

    perks: String,
    assesments: String





}, { timestamps: true })





module.exports = mongoose.model("Job", jobModel)