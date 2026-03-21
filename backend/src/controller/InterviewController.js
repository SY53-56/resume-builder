const interviewREportModel = require("../models/interviewReport.model")
const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const generateInterViewReportController = async (req , res)=>{
 const resumeContent = pdfParse(res.file.buffer)
 const {selfDescription , jobDescription} = req.body
 const interviewReportByAi = await generateInterviewReport({
    resume:resumeContent,
    selfDescription,
    jobDescription
 })
 const interviewReport = await interviewREportModel.create({
    user:req.user.id ,
    resume:resumeContent,
    selfDescription,
    jobDescription,
    ...interviewReportByAi
 })
 res.status(201).json({
    message:"interview report successfully",
    interviewReport
 })
}
module.exports = {
    generateInterViewReportController
}