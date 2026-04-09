const express = require("express")
const routes = express.Router()
const {authMiddleware} = require("../middleware/auth.Middleware")
const {generateInterViewReportController, getInterviewReportByIdController, getInterviewReportByUserId} = require("../controller/InterviewController")
const uploads = require("../middleware/file.middleware")

routes.post("/",  authMiddleware,uploads.single("resume"),generateInterViewReportController )
routes.get("/:interviewId" ,authMiddleware, getInterviewReportByIdController)
routes.get("/user/:id", authMiddleware , getInterviewReportByUserId)
module.exports = routes