const express=require('express')
const router=express.Router()
const {resume,addeducaion, editeducaion, deleteeducaion, addjob, editjob, deletejob, addinternship, editinternship, deleteinternship, addresponsibilitty, editresponsibilitty, deleteresponsibilitty, addproject, editproject, deleteproject, addskills, editskills, deleteskills}=require("../controllers/resumeController")
const { isAuthenticated } = require('../middleware/auth')

router.get("/",isAuthenticated,resume)

// POST Education
router.post("/add-edu",isAuthenticated,addeducaion)
// POST Education
router.post("/edit-edu",isAuthenticated,editeducaion)


// POST Education
router.post("/delete-edu",isAuthenticated,deleteeducaion)


// Post JOB
router.post("/add-job",isAuthenticated,addjob)


// POST job
router.post("/edit-job",isAuthenticated,editjob)

// POST job
router.post("/delete-job",isAuthenticated,deletejob)


// Post intrn
router.post("/add-internship",isAuthenticated,addinternship)


// POST intrn
router.post("/edit-internship",isAuthenticated,editinternship)

// POST inerrn
router.post("/delete-internship",isAuthenticated,deleteinternship)




// Post responsibiliy
router.post("/add-responsibility",isAuthenticated,addresponsibilitty)


// POST responsibiliy
router.post("/edit-responsibility",isAuthenticated,editresponsibilitty)

// POST responsibiliy
router.post("/delete-responsibility",isAuthenticated,deleteresponsibilitty)





// ACAdmic and projects

// Post responsibiliy
router.post("/add-project",isAuthenticated,addproject)


// POST responsibiliy
router.post("/edit-project",isAuthenticated,editproject)

// POST responsibiliy
router.post("/delete-project",isAuthenticated,deleteproject)


// Skills==>


router.post("/add-skills",isAuthenticated,addskills)


// POST responsibiliy
router.post("/edit-skills",isAuthenticated,editskills)

// POST responsibiliy
router.post("/delete-skills",isAuthenticated,deleteskills)





module.exports=router