const express = require("express")
const cookie = require("cookie-parser")
const app = express()
const cors = require("cors")

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://resume-builder-kr7c.vercel.app"
  ],
  credentials: true
}))
app.use(cookie())
app.use(express.json())
const authRoutes = require("./routes/auth.routes")
const interviewRoutes = require("./routes/interview.routes")


app.use("/api/auth" , authRoutes)
app.use("/api/interview", interviewRoutes)
module.exports = app