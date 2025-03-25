const farmGuidePrompt = (plant) => {
  return `
  Generate a well-structured, visually appealing farming guide in strict HTML format for a selected crop in a greenhouse setting. The guide should be formatted as a blog post with proper headings, bullet points, and images for different growth stages. Ensure the content is educational, engaging, and structured in a way that is easy for farmers to follow. Use semantic HTML elements like <h1>, <h2>, <p>, <ul>, <li>, and <img> to ensure readability and accessibility.
  Do not include any inline styles in the output
  Formatting Requirements:
  1️⃣ Start the guide with a structured summary section including:

  ✅ Crop Name
  ✅ Ideal Temperature Range
  ✅ Growth Duration (days to maturity)
  ✅ Recommended Humidity Levels (important for greenhouse control)
  ✅ Light Requirements (Full sun, partial shade, etc.)
  ✅ Yield Potential (Expected output per plant or per square meter)

  Example:
  <h1>The Ultimate Guide to Growing Tomatoes in Your Greenhouse</h1>
  <div class=summary>
  <p>✅ <strong>Crop:</strong> Tomato</p>
  <p>✅ <strong>Ideal Temperature:</strong> 20-25°C</p>
  <p>✅ <strong>Growth Duration:</strong> 60-90 days</p>
  <p>✅ <strong>Recommended Humidity Levels:</strong> 65-85%</p>
  <p>✅ <strong>Light Requirements:</strong> Full sun (at least 6-8 hours of sunlight daily)</p>
  <p>✅ <strong>Yield Potential:</strong> 4-10 kg per plant per season</p>
  </div>

  2️⃣ Follow with a step-by-step farming plan, covering:

      Soil Preparation (ideal soil type, pH level, fertilizers, composting methods).(each point in a separate <p> tag)
      Planting Guidelines (seed spacing, depth, germination time).
      Watering Schedules (based on real-time soil moisture and weather data).
      Pest & Disease Prevention (common threats and treatments).
      Nutrient Management (fertilizer application schedule).
      Harvesting Best Practices (timing, storage tips).
    - The classes should follow this format:
      - <section class="preparation"> for **Soil Preparation**
      - <section class="planting"> for **Planting Guidelines**
      - <section class="watering"> for **Watering Schedules**
      - <section class="pest-control"> for **Pest & Disease Prevention**
      - <section class="nutrition"> for **Nutrient Management**
      - <section class="harvesting"> for **Harvesting Best Practices**

  3️⃣ 🔴 IMPORTANT: Always include AI-generated images using the Pollinations AI image generator API. Use this format for each image:
  <img src='https://image.pollinations.ai/prompt/{your-image-description}' alt='{alt-text-description}'>
  Example for soil preparation in tomato farming:
  <img src='https://image.pollinations.ai/prompt/preparing%20soil%20for%20tomato%20plants' alt='Preparing soil for tomato plants'>

  4️⃣ Ensure the images are relevant to each stage (e.g., soil preparation, planting, watering, pest control, harvesting). Never use placeholders like https://via.placeholder.com/600x400/. If the AI fails to generate an image, regenerate until it provides a valid URL.
  5️⃣ The HTML should be clean and properly structured without unnecessary <div> wrappers or inline styles. Use proper indentation for readability.
  Now, generate the HTML content for a ${plant} farming guide following these instructions. Ensure every section has an AI-generated image using the Pollinations API.
`;
};

const diseasePrompt = `
Analyze the image of the plant and determine the following details, specifically if it's related to farming (such as crops or common plants in agriculture). If not, return an empty JSON {}. If it is a farming-related plant, identify the crop (e.g., 'maize'), the pest or disease present (if applicable), and suggest remedies. Additionally, provide the following insights:
The response should be STRICTLY structured in the following JSON format:
{
  "crop": "Type of crop",
  "disease": "Name of the disease or pest",
  "other_crops_infested": ["List of other crops that could also be affected"],
  "cause": ["Pests, pathogens, or environmental conditions causing the disease"],
  "life_cycle": ["Information about the life cycle of the pest or disease"],
  "remedy": ["Treatment methods, dosage, frequency, and safety precautions"],
  "preventive_measures": ["Steps to avoid future occurrences"],
  "environment_conditions": ["Optimal growing conditions such as soil pH, moisture, and temperature"],
  "nutrient_deficiency": ["Any nutrient deficiencies observed"],
  "companion_planting": ["Suggested companion plants for pest/disease control"],
  "post_harvest_handling": ["Advice on post-harvest management and storage"]
}
`;

const pestPrompt = `
Analyze the image of the pest and identify it. If the image is not related to a pest, return an empty JSON '{}'. If the pest is identified, provide the following information in English:

The response should STRICLY be structured in the following JSON format:
{
  "pest_name": "Common name of the pest",
  "affected_crops": ["List of crops affected by this pest"],
  "life_cycle": ["Description of the pest's life cycle and intervention points"],
  "treatment": ["Treatment methods including dosage and frequency for organic and non-organic solutions"],
  "preventive_measures": ["Steps to avoid future occurrences of the pest"],
  "environment_conditions": ["Environmental conditions where this pest thrives, e.g., temperature, moisture"],
  "companion_planting": ["Companion plants to reduce pest occurrences"],
  "nutrient_deficiencies": ["Nutrient deficiencies that may attract the pest"],
  "post_harvest_handling": ["Post-harvest management advice to avoid spoilage or infestation"]
}
`;

const queryPrompt = `You are a knowledgeable farming assistant, capable of answering farmers' questions in either Swahili or English. Your responses should be brief, factual, and relevant to the topics of farm diseases, pests, or any other agricultural questions.
            If a question is unclear, ask for clarification. Always keep your answers short but informative. Make sure to include brief curative measures.`;
const modelPrompt = `You are a knowledgeable farming assistant.If the user asks a question that is not related to farming, respond with: 'Sorry, I can only help with farming-related questions.'.`;

export default { farmGuidePrompt, diseasePrompt, pestPrompt, queryPrompt, modelPrompt};
