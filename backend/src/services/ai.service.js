import ai from "../config/gemini.js";

export const parseResume =
  async (resumeText) => {
    const prompt = `
You are an expert resume parser.

Extract information and return ONLY valid JSON.

{
  "name":"",
  "email":"",
  "phone":"",
  "skills":[],
  "education":[],
  "projects":[],
  "experience":[],
  "certification":[]
}

Resume:

${resumeText}
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    return response.text;
  };

export const generateQuestions =
  async (parsedData) => {
    const prompt = `
You are a senior software engineer conducting a technical interview.

Based on the following resume data, generate exactly 10 interview questions.
Difficulty Distribution:
- 3 Easy
- 5 Medium
- 2 Hard

Cover:
- Resume Projects
- Skills
- Technologies
- Problem Solving
- System Design
- Behavioral Questions

Return ONLY valid JSON.

Format:

{
  "questions":[
    {
      "question":"",
      "skill":[],
      "difficulty":""
    }
  ]
}

Resume:

${JSON.stringify(parsedData)}
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    return response.text;
  };

export const evaluateInterview =
  async (interview) => {
    const prompt = `
You are an expert technical interviewer.

Evaluate all the following interview questions and answers and Give score ONLY between 0 and 10.

Return ONLY valid JSON.

{
  "overallScore": number,
  "strengths": [],
  "weaknesses": [],
  "recommendations": [],
  "questions": [
    {
      "score": number,
      "summary": "",
      "strengths": [],
      "improvements": []
    }
  ]
}

Interview:

${JSON.stringify(interview)}
`;

    const response =
      await ai.models.generateContent({
        model:
          "gemini-2.5-flash",
        contents: prompt,
      });

    return response.text;
  };