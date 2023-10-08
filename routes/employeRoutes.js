const express = require('express')
const router = express.Router()
const { homepage, employesignup, employesignin, employeavatar, employeupdate, employesignout, employesendmail, currentUser, employeforgetlink, employeresetpassword, employedeleteaccount, createinternship, createjob, readinternship, readsingleinternship, readsinglejob, readjob, getallapplications, getstudentdets, getalllisting } = require("../controllers/employeController")

const { isAuthenticated } = require('../middleware/auth')

router.get("/employe", homepage)

// GET / employe
// router.get("/employe",isAuthenticated,currentUser)

// POST /employe/signup
router.post("/signup",employesignup)

// POST /employe/signin
router.post("/signin",employesignin)


// POST /employe/signout
router.post("/signout",isAuthenticated,employesignout)

// POST /employe/send-mail
router.post("/send-mail",employesendmail)



// /employe/forget-link/650e8d2673acd17477a6b38a
// GET /employe/send-mail

// Pending in frontEnd--->
router.post("/forget-link",employeforgetlink)

// POST /employe/reset-password/:id
router.post("/reset-password",isAuthenticated,employeresetpassword)

router.post("/delete-account",isAuthenticated,employedeleteaccount)



// POST /employe/update/:id
router.post("/update",isAuthenticated,employeupdate)

// POST /employe/avatar/:id
router.post("/organizationlogo",isAuthenticated,employeavatar)

// <------------------------------- Internship -------------------------->

// POST /employe/intership/create
router.post("/intership/create",isAuthenticated,createinternship)


// GET /employe/intership/read
router.get("/intership/read",isAuthenticated,readinternship)


// POST /employe/intership/Singleread
router.get("/intership/read/:id",isAuthenticated,readsingleinternship)



// View REsume dets
router.get("/view-resume/:studentid",isAuthenticated,getstudentdets)


// GET allListing of jobs and internships
router.get("/getalllisting",isAuthenticated,getalllisting)
















// <------------------------------- Job -------------------------->
// POST /employe/job

router.post("/job/create",isAuthenticated,createjob)



// GET /employe/intership/read
router.get("/job/read",isAuthenticated,readjob)


// POST /employe/intership/Singleread
router.get("/job/read/:id",isAuthenticated,readsinglejob)




// GET  ALL Applications

router.get("/allapplications",isAuthenticated,getallapplications)





module.exports = router