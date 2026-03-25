require("dotenv").config()
const app = require("./src/app")
const connectDb =require("./src/config/database")
const {generateInterviewReport} =require("./src/services/ai.service")
const { resume,
    selfDescription,
    jobDescription} = require("./src/services/temp")
connectDb()
generateInterviewReport({resume , selfDescription,jobDescription})

app.listen(3000, ()=>{
    console.log("server is runing in 3000")
})