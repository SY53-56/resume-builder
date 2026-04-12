const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// ✅ ZOD SCHEMA (same as Mongo)
const interviewReportSchema = z.object({
  matchScore: z.number(),

  technicalQuestion: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  behavioralQuestion: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  skillGap: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    })
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      task: z.array(z.string()),
    })
  ),
  

  title: z.string(),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
You are an expert interviewer.

Generate a COMPLETE interview report in STRICT JSON format.

⚠️ RULES:
- Return ONLY JSON
- DO NOT add extra fields
- DO NOT rename keys
- DO NOT return empty arrays
- Generate:
  - 5 technical questions
  - 5 behavioral questions
  - 5 skill gaps
  - 7 preparation days

FORMAT:
{
  "matchScore": number,
  "technicalQuestion": [
    { "question": "", "intention": "", "answer": "" }
  ],
  "behavioralQuestion": [
    { "question": "", "intention": "", "answer": "" }
  ],
  "skillGap": [
    { "skill": "", "severity": "low | medium | high" }
  ],
  "preparationPlan": [
    { "day": 1, "focus": "", "task": [""] }
  ],
  "title": ""
}

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  let text = response.text;

  // ✅ CLEAN RESPONSE
  text = text.replace(/```json|```/g, "").trim();

  let parsed;

  try {
    parsed = JSON.parse(text);
  } catch (err) {
    console.log("❌ JSON PARSE ERROR:", text);
    throw new Error("AI returned invalid JSON");
  }

  // ✅ VALIDATE WITH ZOD
  const validated = interviewReportSchema.safeParse(parsed);

  if (!validated.success) {
    console.log("❌ ZOD ERROR:", validated.error);
    throw new Error("AI returned invalid structure");
  }
  console.log("validata dafsghsdkjsajdfjsdf",validated)
  return validated.data;
}






module.exports = { generateInterviewReport }