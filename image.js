const dotenv = require("dotenv");
const fs = require("fs")
dotenv.config();
// Make sure to include these imports:
const { GoogleGenerativeAI } = require("@google/generative-ai");
// Make sure to include these consts:
// const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const abc = async (params) => {
  //   const result = await model.generateContentStream(prompt);
  const prompt = "Recognise the freshness and shelf life in terms of number.";             // prompt engineering 
  // Note: The only accepted mime types are some image types, image/*.
  const imagePart = fileToGenerativePart(`./download.jpg`, "image/jpeg");
  // Print text as it comes in.
  const result = await model.generateContent([prompt, imagePart]);
  console.log(result.response.text());
};

abc();

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}
