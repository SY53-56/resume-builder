const mongoose = require("mongoose");

// ✅ Technical Questions
const technicalQuestionSchema = new mongoose.Schema({
    question: { type: String, required: [true, "Technical Question is required"] },
    intention: { type: String, required: [true, "Intention is required"] },
    answer: { type: String, required: [true, "Answer is required"] },
}, { _id: false });

// ✅ Behavioral Questions
const behavioralQuestionSchema = new mongoose.Schema({
    question: { type: String, required: [true, "Behavioral Question is required"] },
    intention: { type: String, required: [true, "Intention is required"] },
    answer: { type: String, required: [true, "Answer is required"] },
}, { _id: false });

// ✅ Skill Gaps
const skillGapSchema = new mongoose.Schema({
    skill: { type: String, required: [true, "Skill is required"] },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    }
}, { _id: false });

// ✅ Preparation Plan
const preparationPlanSchema = new mongoose.Schema({
    day: { type: Number, required: [true, "Day is required"] },
    focus: { type: String, required: [true, "Focus is required"] },
    task: [{ type: String }]
}, { _id: false });

// ✅ Main Schema
const interviewReportSchema = new mongoose.Schema({
    jobDescription: { type: String, required: [true, "Job description is required"] },
    resume:{type:String},
    selfDescription: {type:String},
    matchScore: { type: Number, min: 0, max: 100 },

    technicalQuestion: [technicalQuestionSchema],
    behavioralQuestion: [behavioralQuestionSchema],
    skillGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });

module.exports = mongoose.model("InterviewReport", interviewReportSchema);