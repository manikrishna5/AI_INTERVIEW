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
  "experience":[]
}

Resume:

${resumeText}
`;

    const response =
      await ai.models.generateContent({
        model:
          "gemini-2.5-flash",
        contents: prompt,
      });

    return response.text;
  };