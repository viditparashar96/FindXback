const express=require('express')
const router=express.Router()
const {studentsignup,studentsignin,studentavatar,studentupdate,studentsignout,studentsendmail,currentUser,studentforgetlink,studentresetpassword, studentdeleteaccount, applyinternship, applyjob, getallinternship, getalljobs, getinternshipbyid, getinternshipbyprofile, getinternshipbylocation, getjobbyid, getjobbyprofile, getjobbylocation, getallapplications}=require("../controllers/indexController")
const { isAuthenticated } = require('../middleware/auth')

// Dummy Auth route=>
router.post("/dummy",isAuthenticated,(req,res)=>{
    
    res.send("dummy auth")
})

// GET / Student
router.get("/student",isAuthenticated,currentUser)

// POST /student/signup
router.post("/student/signup",studentsignup)

// POST /student/signin
router.post("/student/signin",studentsignin)


// POST /student/signout
router.post("/student/signout",isAuthenticated,studentsignout)

// POST /student/send-mail
router.post("/student/send-mail",studentsendmail)



// /student/forget-link/650e8d2673acd17477a6b38a
// GET /student/send-mail
router.post("/student/forget-link",studentforgetlink)

// POST /student/reset-password/:id
router.post("/student/reset-password",isAuthenticated,studentresetpassword)

router.post("/student/delete-account",isAuthenticated,studentdeleteaccount)



// POST /student/update/:id
router.post("/student/update",isAuthenticated,studentupdate)

// POST /student/avatar/:id
router.post("/student/avatar",isAuthenticated,studentavatar)



// ----------------------Apply intership ----------------------------

// POST /student/apply/internship/:id
router.post("/student/apply/internship/:internshipid",isAuthenticated,applyinternship)




// ----------------------GET ALL intership ----------------------------

// GET /student/internships
router.get("/student/internships",getallinternship)



// ----------------------GET  intership by id ----------------------------

// GET /student/internship/:internshipid
router.get("/student/internship/:internshipid",getinternshipbyid)




// ----------------------GET  intership by ProfileQuery ----------------------------

// GET /student/internship/:internshipid
router.get("/student/internships/search",getinternshipbyprofile)


// ----------------------GET  intership by locationQuery ----------------------------

// GET /student/internship/:internshipid
router.get("/student/internships/search/bylocation",getinternshipbylocation)






// ----------------------Apply Job ----------------------------


// POST /student/apply/job/:id
router.post("/student/apply/job/:jobid",isAuthenticated,applyjob)


// ----------------------GET ALL Jobs ----------------------------

// GET /student/jobs
router.get("/student/jobs",getalljobs)



// ----------------------GET  job by id ----------------------------

// GET /student/internship/:internshipid
router.get("/student/job/:jobid",getjobbyid)




// ----------------------GET  JObs by ProfileQuery ----------------------------

// GET /student/internship/:internshipid
router.get("/student/jobs/search",getjobbyprofile)


// ----------------------GET  Jobs by locationQuery ----------------------------

// GET /student/internship/:internshipid
router.get("/student/jobs/search/bylocation",getjobbylocation)


// Views all Applications Routes
// GET /student/allApplications
router.get("/student/allapplications",isAuthenticated,getallapplications)






module.exports=router