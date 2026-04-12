const interviewReportModel = require("../models/interviewReport.model");
const pdfParse = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service");

// ✅ Generate Report
const generateInterViewReportController = async (req, res) => {
  try {
    const { selfDescription, jobDescription } = req.body;

    let resumeText = "";

    if (req.file) {
      const pdf = await pdfParse(req.file.buffer);
      resumeText = pdf.text;
    }

    if (!resumeText && !selfDescription) {
      return res.status(400).json({
        message: "Either resume or self description is required",
      });
    }

    const aiData = await generateInterviewReport({
      resume: resumeText,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeText,
      selfDescription,
      jobDescription,
      title: aiData.title || "Interview",
      matchScore: aiData.matchScore,
      technicalQuestion: aiData.technicalQuestion,
      behavioralQuestion: aiData.behavioralQuestion,
      skillGap: aiData.skillGap,
      preparationPlan: aiData.preparationPlan,
    });
console.log(interviewReport)
    res.status(201).json({
      message: "Interview report created",
      interviewReport,
    });
  } catch (error) {
    console.error("❌ Generate Error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ✅ Get Single Report (OPTIMIZED)
const getInterviewReportByIdController = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { section } = req.query;

    let selectFields = "-resume -__v";

    // ✅ Load only needed section
    if (section === "technical") selectFields += " technicalQuestion";
    if (section === "behavioral") selectFields += " behavioralQuestion";
    if (section === "roadmap") selectFields += " preparationPlan";

    const interviewReport = await interviewReportModel
      .findOne({ _id: interviewId, user: req.user.id })
      .select(selectFields);

    if (!interviewReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({
      message: "Report fetched",
      interviewReport,
    });
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ✅ Get All Reports (LIGHTWEIGHT)
const getInterviewReportByUserId = async (req, res) => {
  try {
    const reports = await interviewReportModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -technicalQuestion -behavioralQuestion -skillGap -preparationPlan -__v"
      );

    res.status(200).json({
      message: "Reports fetched",
      interviewReport: reports,
    });
  } catch (error) {
    console.error("❌ Fetch All Error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  generateInterViewReportController,
  getInterviewReportByIdController,
  getInterviewReportByUserId,
};