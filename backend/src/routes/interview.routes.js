const express = require("express")
const routes = express.Router()
const {authMiddleware} = require("../middleware/auth.Middleware")
const {generateInterViewReportController, getInterviewReportByIdController, getInterviewReportByUserId} = require("../controller/InterviewController")
const uploads = require("../middleware/file.middleware")

routes.post("/",  uploads.single("resume"),generateInterViewReportController )
routes.get("/:interviewId" , getInterviewReportByIdController)
routes.get("/user/:id", authMiddleware , getInterviewReportByUserId)
module.exports = routes