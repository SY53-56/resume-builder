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


    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeText,
      selfDescription,
      jobDescription,
      title:interviewReportByAi.title||"interview",
      matchScore: interviewReportByAi.matchScore,
      technicalQuestion: interviewReportByAi.technicalQuestion,
      behavioralQuestion: interviewReportByAi.behavioralQuestion,
      skillGap: interviewReportByAi.skillGap,
      preparationPlan: interviewReportByAi.preparationPlan,
    });

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
const getInterviewReportByIdController = async(req,res)=>{
   const {interivewId} = req.params
   try{
   
      const interviewReport = await interviewReportModel.findOne({_id:interivewId, user:req.user.id})
      if(!interviewReport){
        return res.status(400).json({message:"something wrong"})
      }
     return res.status(200).json({
         message:"interview report fetched successfully",
         interviewReport
      })
   }catch(e){
res.status(400).json({message:`error ${e}`})
   }
}

const getInterviewReportByUserId = async(req,res)=>{
   

const interviewReport = await interviewReportModel
  .find({ user: req.user.id })  // ✅ correct
  .sort({ createdAt: -1 })
  .select("-resume -selfDescription -jobDescription -__v -technicalQuestion -behavioralQuestion -skillGap -preparationPlan");
   if(!interviewReport){
    return res.status(400).json({message:"something wrong"})
   }
   return res.status(200).json({
      message:"user interview detaisl",
      interviewReport
   })
}
module.exports = {
  generateInterViewReportController,
  getInterviewReportByIdController,
  getInterviewReportByUserId
};