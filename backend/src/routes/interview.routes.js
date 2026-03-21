const express = require("express")
const routes = express.Router()
const {authMiddleware} = require("../middleware/auth.Middleware")
const {generateInterViewReportController} = require("../controller/InterviewController")
const uploads = require("../middleware/file.middleware")

routes.post("/", authMiddleware, uploads.single("resume"),generateInterViewReportController )
module.exports = routes