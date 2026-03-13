const express = require("express")
const cookie = require("cookie-parser")
const app = express()
app.use(cookie())
app.use(express.json())
const authRoutes = require("./routes/auth.routes")


app.use("/api/auth" , authRoutes)
module.exports = app