import type { Handler } from "@netlify/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// 🔒 SYSTEM PROMPT (LOCKED, NOT CLIENT-CONTROLLED)
const systemInstruction = (vibe: string) => `
You are a professional fashion stylist.
Style preference: ${vibe}.
Rules:
- Be concise
- Weather-aware
- Output bullet points only
- No emojis
- No markdown
`;

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    if (!event.body) {
      return { statusCode: 400, body: "Missing body" };
    }

    const { lat, lon, city, vibe } = JSON.parse(event.body);

    // 🔒 Validate input
    if (!vibe || (!city && (!lat || !lon))) {
      return { statusCode: 400, body: "Invalid request" };
    }

    // 🌦 WEATHER FETCH (SERVER-SIDE)
    const weatherUrl = city
      ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
      : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;

    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    const temperature = weatherData.main.temp;
    const condition = weatherData.weather[0].description;
    const locationName = weatherData.name;

    // 🤖 AI GENERATION
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction(vibe),
    });

    const prompt = `
Location: ${locationName}
Temperature: ${temperature}°C
Condition: ${condition}

Suggest outfits.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const outfits = text
      .split("\n")
      .map((line) => line.replace(/^[-•]/, "").trim())
      .filter(Boolean);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        weather: weatherData,
        outfits,
      }),
    };
  } catch (error) {
    console.error("Stylist function error:", error);

    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};
