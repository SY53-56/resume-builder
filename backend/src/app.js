const express = require("express")
const cookie = require("cookie-parser")
const app = express()
const cors = require("cors")

app.use(cors({
    origin: process.env.FRONTEND_LINK ||"http://localhost:5173",
    credentials:true
}))
app.use(cookie())
app.use(express.json())
const authRoutes = require("./routes/auth.routes")
const interviewRoutes = require("./routes/interview.routes")


app.use("/api/auth" , authRoutes)
app.use("/api/interview", interviewRoutes)
module.exports = app