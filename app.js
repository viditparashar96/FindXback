const express=require("express")
require("dotenv").config()
const app =express()
const logger=require("morgan")
const ErorrHandler = require("./utils/ErrorHandler")
const { generatedErrors } = require("./middleware/errors")
const {dbconnect}=require('./config/database')
const cors=require("cors")
const fileUpload=require("express-fileupload")
dbconnect()

const corsOptions = {
    origin: 'https://find-x-frontend.vercel.app',
    credentials: true,
  };
//   http://localhost:5173
app.use(logger('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(fileUpload())

// session and cookie
const session =require('express-session')
const cookieParser=require('cookie-parser')
app.use(cors(corsOptions))

app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:process.env.EXPRESS_SESSION_SECRECT
}))
app.use(cookieParser())






// app.use("/api/v1",require("./routes/indexRouter"))
app.use("/user",require("./routes/indexRouter"))
app.use("/resume",require("./routes/resumeRoutes"))
app.use("/employe",require("./routes/employeRoutes"))



app.get("/",(req,res)=>{
    res.send("Home Page")
})


// error handling->
app.all("*",(req,res,next)=>{
    next(new ErorrHandler(`Requested Url Not Found ${req.url}`,404))
})
app.use(generatedErrors)



app.listen(process.env.PORT,console.log(`server running on port ${process.env.PORT}`))