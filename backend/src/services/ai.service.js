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

export const evaluateAnswer =
  async (
    question,
    answer
  ) => {
    const prompt = `
You are a senior technical interviewer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer on a scale of 0-10.

Scoring Rubric:
10 - Perfect answer with deep understanding.
8-9 - Correct answer with good explanation and minor omissions.
6-7 - Mostly correct but missing important details.
4-5 - Partially correct with significant gaps.
2-3 - Poor understanding.
0-1 - Completely incorrect.

Be strict but fair.

Return ONLY valid JSON.

{
  "score": 0,
  "summary": "",
  "strengths": [],
  "improvements": []
}
`;

    const response =
      await ai.models.generateContent({
        model:
          "gemini-2.5-flash",

        contents: prompt,
      });

    return response.text;
  };

  export const generateFinalReport =
  async (interview) => {
    const prompt = `
You are a senior technical interviewer.

Based on this interview data,
generate a final report.

Interview:

${JSON.stringify(interview)}

Return ONLY valid JSON.

{
  "strengths": [],
  "weaknesses": [],
  "recommendations": []
}
`;

    const response =
      await ai.models.generateContent({
        model:
          "gemini-2.5-flash",

        contents: prompt,
      });

    return response.text;
  };