const mongoose = require("mongoose")


/*
 * - job description
* resume text
self description
*technical question
behaviral question:[]

skill gaps:[]
preparation plane:[]
*/
const technicalQuestionSchema = new mongoose.Schema({
    question:{type:String, required:[true , "Technical Question is required"]},
    intention:{type:String,require:[true,"Intention is required"]},
    answer:{type:String , required:[true,"Answer is required"]},
}
,{
    id:false
})
const behaviralQuestionSchema =new mongoose.Schema({
    question:{type:String, required:[true , "Technical Question is required"]},
    intention:{type:String,require:[true,"Intention is required"]},
    answer:{type:String , required:[true,"Answer is required"]},
}
,{
    id:false
})
const skillgapSchema = new mongoose.Schema({
    skill:{type:String, reqired:[true ,"skill  is required"]},
    severity:{type:String, enum:["low","medium","high"] , required:[true, "severity is required"]}
},{
    id:false
})
const preparationPlanSchema = new mongoose.Schema({
    day:{type:Number , reqired:[true, "Day is required"]},
    focus:{
        type:String,
        required:[true, "focus is required"]
    }
})
const interviewReportSchema = new mongoose.Schema({
    jobDescription:{type:String , required:[true,"Job description is required"],},
    resume:{type:String},
    selfDescription:{type:String},
    matchScore:{type:Number ,min:0,max:100,},
    technicalQuestion:[technicalQuestionSchema],
    behaviralQuestion:[behaviralQuestionSchema],
    skillgaps:[skillgapSchema],
    preparationPlan:[preparationPlanSchema]
},{
    timestamps:true
})
const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema)
module.exports = interviewReportModel