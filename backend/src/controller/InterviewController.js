const interviewReportModel = require("../models/interviewReport.model");
const pdfParse = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service");

const generateInterViewReportController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const pdf = await pdfParse(req.file.buffer);
    const resumeText = pdf.text;

    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
      resume: resumeText,
      selfDescription,
      jobDescription,
    });

    console.log("✅ AI RESPONSE:", interviewReportByAi);

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeText,
      selfDescription,
      jobDescription,

      matchScore: interviewReportByAi.matchScore,
      technicalQuestion: interviewReportByAi.technicalQuestion,
      behavioralQuestion: interviewReportByAi.behavioralQuestion,
      skillGap: interviewReportByAi.skillGap,
      preparationPlan: interviewReportByAi.preparationPlan,
    });
console.log("sahulyadav", interviewReport)
    res.status(201).json({
      message: "Interview report successfully",
      interviewReport,
    });
  } catch (error) {
    console.error("❌ ERROR:", error.message);

    res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};

module.exports = {
  generateInterViewReportController,
};