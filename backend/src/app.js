const express = require("express")
const cookie = require("cookie-parser")
const app = express()
const cors = require("cors")
app.use(cookie())
app.use(express.json())
const authRoutes = require("./routes/auth.routes")
const interviewRoutes = require("./routes/interview.routes")
app.use(cors({
    origin:"http://localhost:5174",
    credentials:true
}))

app.use("/api/auth" , authRoutes)
app.use("/api/interview", interviewRoutes)
module.exports = app