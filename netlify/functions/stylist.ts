import type { Handler } from "@netlify/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

/* ------------------ CONFIG ------------------ */

const MAX_REQUESTS_PER_MINUTE = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/* ------------------ RATE LIMIT STORE ------------------ */
// In-memory, best-effort (serverless-safe)
const rateLimitMap = new Map<
  string,
  { count: number; firstRequestTime: number }
>();

/* ------------------ SYSTEM PROMPT ------------------ */
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

/* ------------------ HANDLER ------------------ */
export const handler: Handler = async (event) => {
  try {
    /* ---------- METHOD GUARD ---------- */
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    /* ---------- IP EXTRACTION ---------- */
    const ip =
      event.headers["x-forwarded-for"]?.split(",")[0] ??
      "unknown";

    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (record) {
      if (now - record.firstRequestTime < RATE_LIMIT_WINDOW_MS) {
        if (record.count >= MAX_REQUESTS_PER_MINUTE) {
          return {
            statusCode: 429,
            body: "Too many requests. Please slow down.",
          };
        }
        record.count += 1;
      } else {
        rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
    }

    /* ---------- BODY VALIDATION ---------- */
    if (!event.body) {
      return { statusCode: 400, body: "Missing request body" };
    }

    const { lat, lon, city, vibe } = JSON.parse(event.body);

    if (!vibe || (typeof vibe !== "string")) {
      return { statusCode: 400, body: "Invalid vibe" };
    }

    if (!city && (typeof lat !== "number" || typeof lon !== "number")) {
      return { statusCode: 400, body: "Invalid location" };
    }

    /* ---------- WEATHER FETCH ---------- */
    const weatherUrl = city
      ? `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
      : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;

    const weatherRes = await fetch(weatherUrl);
    if (!weatherRes.ok) {
      return { statusCode: 502, body: "Weather service failed" };
    }

    const weatherData = await weatherRes.json();

    /* ---------- AI GENERATION ---------- */
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction(vibe),
    });

    const prompt = `
Location: ${weatherData.name}
Temperature: ${weatherData.main.temp}°C
Condition: ${weatherData.weather[0].description}

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
