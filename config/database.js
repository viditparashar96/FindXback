const mongoose=require('mongoose')
require("dotenv").config()
exports.dbconnect=async()=>{

    try {
       await mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB connented")).catch((err)=>console.log(err))
    } catch (error) {
        console.log(error.message)
    }
}
