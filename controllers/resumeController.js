const { catchAsyncErrors } = require("../middleware/catchAsyncErrors")
const Student = require("../models/studentModel")
const ErorrHandler = require("../utils/ErrorHandler")
const { v4: uuidv4 } = require('uuid');


exports.resume = catchAsyncErrors(async (req, res, next) => {
    const { resume } = await Student.findById(req.id).exec()
    res.status(200).json({
        success: true,
        resume
    })
})

// EDUCAION CONTROLLER===>

exports.addeducaion = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    student.resume.education.push({ ...req.body, id: uuidv4() })
    await student.save()
    res.status(200).json({
        success: true,
        msg: "Education Added",
        student
    })
})

exports.editeducaion = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    console.log(student)
    console.log(req.body)
    const eduIndex = student.resume.education.findIndex(i => i.id === req.body.id)
    student.resume.education[eduIndex] = { ...student.resume.education[eduIndex], ...req.body }
    await student.save()
    res.status(200).json({
        success: true,
        msg: "Education Upadated",
        student
    })
})


exports.deleteeducaion = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    console.log(req.body.id)
    const eduIndex = student.resume.education.findIndex(i => i.id === req.body.id)
    student.resume.education.splice(eduIndex, 1)
    await student.save()
    res.status(200).json({
        success: true,
        msg: "Education deleted",
        student
    })
})

// JOB CONTROLLER===>

exports.addjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    student.resume.jobs.push({ ...req.body, id: uuidv4() })
    await student.save()
    res.status(200).json({
        success: true,
        msg: "job Added",
        student
    })
})

exports.editjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    const eduIndex = student.resume.jobs.findIndex(i => i.id === req.body.id)
    student.resume.jobs[eduIndex] = { ...student.resume.jobs[eduIndex], ...req.body }
    await student.save()
    res.status(200).json({
        success: true,
        msg: "job Upadated",
        student
    })
})


exports.deletejob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    console.log(req.body.id)
    const eduIndex = student.resume.jobs.findIndex(i => i.id === req.body.id)
    student.resume.jobs.splice(eduIndex, 1)
    await student.save()
    res.status(200).json({
        success: true,
        msg: "Job deleted",
        student
    })
})

// internship CONtroller===>

exports.addinternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    student.resume.interships.push({ ...req.body, id: uuidv4() })
    await student.save()
    res.status(200).json({
        success: true,
        msg: "internship Added",
        student
    })
})

exports.editinternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    const eduIndex = student.resume.interships.findIndex(i => i.id === req.body.id)
    student.resume.interships[eduIndex] = { ...student.resume.interships[eduIndex], ...req.body }
    await student.save()
    res.status(200).json({
        success: true,
        msg: "internship Upadated",
        student
    })
})


exports.deleteinternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    const eduIndex = student.resume.interships.findIndex(i => i.id === req.body.id)
    student.resume.interships.splice(eduIndex, 1)
    await student.save()
    res.status(200).json({
        success: true,
        msg: "internship deleted",
        student
    })
})

// Responsibility controller


exports.addresponsibilitty = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    student.resume.responsibilities.push({ ...req.body, id: uuidv4() })
    await student.save()
    res.status(200).json({
        success: true,
        msg: "responsibilities Added",
        student
    })
})

exports.editresponsibilitty = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    const eduIndex = student.resume.responsibilities.findIndex(i => i.id === req.body.id)
    student.resume.responsibilities[eduIndex] = { ...student.resume.responsibilities[eduIndex], ...req.body }
    await student.save()
    res.status(200).json({
        success: true,
        msg: "responsibilities Upadated",
        student
    })
})


exports.deleteresponsibilitty = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    const eduIndex = student.resume.responsibilities.findIndex(i => i.id === req.body.id)
    student.resume.responsibilities.splice(eduIndex, 1)
    await student.save()
    res.status(200).json({
        success: true,
        msg: "responsibilities deleted",
        student
    })
})




// Projects and acadmics=====>





exports.addproject = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    student.resume.projects.push({ ...req.body, id: uuidv4() })
    await student.save()
    res.status(200).json({
        success: true,
        msg: "projects Added",
        student
    })
})

exports.editproject = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    const eduIndex = student.resume.projects.findIndex(i => i.id === req.body.id)
    student.resume.projects[eduIndex] = { ...student.resume.projects[eduIndex], ...req.body }
    await student.save()
    res.status(200).json({
        success: true,
        msg: "projects Upadated",
        student
    })
})


exports.deleteproject = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    const eduIndex = student.resume.projects.findIndex(i => i.id === req.body.id)
    student.resume.projects.splice(eduIndex, 1)
    await student.save()
    res.status(200).json({
        success: true,
        msg: "Projects deleted",
        student
    })
})


// Skills===>



exports.addskills = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    student.resume.skills.push({ ...req.body, id: uuidv4() })
    await student.save()
    res.status(200).json({
        success: true,
        msg: "Skills Added",
        student
    })
})

exports.editskills = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    const eduIndex = student.resume.skills.findIndex(i => i.id === req.body.id)
    student.resume.skills[eduIndex] = { ...student.resume.skills[eduIndex], ...req.body }
    await student.save()
    res.status(200).json({
        success: true,
        msg: "Skills Upadated",
        student
    })
})


exports.deleteskills = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    const eduIndex = student.resume.skills.findIndex(i => i.id === req.body.id)
    student.resume.skills.splice(eduIndex, 1)
    await student.save()
    res.status(200).json({
        success: true,
        msg: "Skills deleted",
        student
    })
})