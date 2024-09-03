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
  const prompt = "Identify the vegetable/fruit and analyze its current shelf life, ripening period, and ideal market timing post-ripening. Detail the prime harvest season and offer both the present and expected market rates in INR within the Indian market after sale. Further, determine the optimal Indian state for selling this produce, providing both the state's name and its geographical coordinates for map plotting purposes. \n" +
            "The output should be present in the following format separately for each detected fruit/vegetable. Use the bullet symbol provided below instead of using asterisk." +
            "● Shelf Life: \n" +
            "● Ripening period: \n" +
            "● Ideal market timing: \n" +
            "● Prime harvest season: \n" +
            "● Present market rate (INR): \n" +
            "● Expected market rate (INR): \n" +
            "● Optimal Indian state for selling: \n";             // prompt engineering 
  // Note: The only accepted mime types are some image types, image/*.
  const imagePart = fileToGenerativePart(`./download1.jpg`, "image/jpeg");
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
