import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import config from "../config/config.js";

const genAI = new GoogleGenerativeAI(config.gemini.api_key);
const model = genAI.getGenerativeModel({
  model: config.gemini.model,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const farmGuide = async (prompt) => {
  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  });

  const output = await chatSession.sendMessage("");
  const response = output.response.text();
  return response
    .trim()
    .replace(/^```html/, "")
    .replace(/```$/, "")
    .trim();
};

const predictModel = async (file, mimeType, prompt) => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: Buffer.from(file).toString("base64"),
                mimeType,
              },
            },
          ],
        },
      ],
    });
    const result = await chatSession.sendMessage("Analyze this image");
    let responseText = result.response.text();
    const jsonMatch = responseText.match(/{.*}/s); // Match the JSON structure
    if (jsonMatch) {
      responseText = jsonMatch[0];
    } else {
      console.info("Invalid response format, no JSON found");
      return {};
    }
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error during model prediction or JSON parsing:", error);
    return {};
  }
};

export default { farmGuide, predictModel };
