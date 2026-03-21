const {GoogleGenAI, Behavior} = require("@google/genai") 
const {z} =require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema");
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema= z.object({
    matchScore:z.number().describe("A score between 0 to 100 indicating how well the candidate's prof"),
    technicalQuestion:z.array(z.object({
        question:z.string().describe("the technical question can be asked in the  interview"),
        intention:z.string().describe("the intention of interviewer behind asking theis question"),
        answer:z.string().describe("how to answer of this question, what's points to cover, and what approch")
    })).describe("technical question that can be asked in the interview along with their intebtion and hoe to answer them"),
    behavioralQuestion:z.array(z.object({
        question:z.string().describe("the technical question can be asked in the  interview"),
        intention:z.string().describe("the intention of interviewer behind asking theis question"),
        answer:z.string().describe("how to answer of this question, what's points to cover, and what approch")
    })).describe("behavioral question that can be asked in the interview along with their intebtion and hoe to answer them"),
    skillgap:z.array(z.object({
        skill: z.string().describe("the skill which the candidate is lacking"),
        severity:z.enum(["low","meduim","high"]).describe("thet severity of this skill gap")
    })).describe("behavioral question that can be asked in the interview along with their intebtion and hoe to answer them"),
    preparationPlan:z.array(z.object({
        day:z.number().describe("the day number is the preparation plan, starting from 1"),
        focus:z.string().describe("the main focus of this day in the preparation plan, e.g.data"),
        task:z.array(z.string().describe("List of  task to be done on this day"))
    })).describe("a day-wise preparation plan for tha candidate rtto follow in order")
})

async function generateInterviewReport({resume,selfDescription , jobDescription}){

const prompt = `Generate an interview report for a candidate with the following details:
resume:${resume}
self Description: ${selfDescription}
job Description: ${jobDescription}`

 const response = await ai.models.generateContent({
    model:"gemini-2.5-flash",
    contents:prompt,
    config: {
    responseMimeType: "application/json",
    responseJsonSchema: zodToJsonSchema(interviewReportSchema),
  },
 })

 return JSON.parse(response.text)
}
module.exports = generateInterviewReport