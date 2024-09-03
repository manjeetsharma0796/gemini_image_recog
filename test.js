const dotenv = require("dotenv");
dotenv.config();
// Make sure to include these imports:
const { GoogleGenerativeAI } = require("@google/generative-ai");
// Make sure to include these consts:
// const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const abc = async (params) => {
  const prompt = `Write a ${params}`;

  const result = await model.generateContentStream(prompt);

  // Print text as it comes in.
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    process.stdout.write(chunkText);
  }
};

abc();
