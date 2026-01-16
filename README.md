# AI Outfit Stylist 👔🌦️

**Weather-aware outfit recommendations powered by AI**

AI Outfit Stylist is a modern, motion-first web application that generates personalized outfit suggestions based on **real-time weather data**, **user style preferences**, and **live location**, all while keeping third-party API keys fully secure using a serverless backend.

This project focuses on **UX polish, animation quality, security, and scalable architecture**, not just AI integration.

---

## ✨ Features

* 🌦️ **Weather-aware recommendations** (OpenWeatherMap)
* 🤖 **AI-powered outfit generation** (Google Gemini)
* 📍 **Live location toggle** with graceful fallback
* 🎭 **Style (Vibe) switcher**

  * Corporate Sleek
  * Streetwear
  * Weekend Casual
* 🧊 **Glassmorphism UI** with neon glow
* 🎞️ **Framer Motion animations**

  * Staggered AI result entry
  * Animated toggles
  * Micro-interactions
* 🎨 **Dynamic background** that reacts to weather
* 📋 **Copy-to-clipboard** with animated toast feedback
* ⏳ **Skeleton loaders** to reduce perceived wait time
* 🔐 **Zero API keys exposed to the client**

---

## 🛠️ Tech Stack

### Frontend

* **React 19 + TypeScript**
* **Vite**
* **Tailwind CSS v4**
* **Framer Motion**
* **Lucide Icons**

### Backend

* **Netlify Serverless Functions**
* **Google Gemini SDK**
* **OpenWeatherMap API**

### Security

* Environment variables (server-only)
* No client-side API calls to third-party services
* Locked system prompts
* Input validation on backend

---

## 🧠 Architecture Overview

```
┌──────────────┐
│   Browser    │
│  (React UI)  │
└──────┬───────┘
       │ POST /api/stylist
       │
┌──────▼────────────────────┐
│ Netlify Serverless Function│
│   /netlify/functions       │
│        stylist.ts          │
└──────┬───────────┬────────┘
       │           │
       │           │
┌──────▼──────┐ ┌──▼────────────────┐
│ OpenWeather │ │ Google Gemini AI  │
│   API       │ │ (LLM Generation)  │
└─────────────┘ └───────────────────┘
```

### Why this architecture?

* The **browser never accesses third-party APIs**
* API keys are stored **only on the server**
* Prompts cannot be modified by the client
* Easier to rate-limit and monitor usage
* Production-ready security model

---

## 🔐 Security Design


* ✅ Server-side prompt control (prevents prompt injection)
* ✅ Input validation before API calls

---

## 📂 Project Structure

```
src/
 ├── components/
 │    ├── GlassCard.tsx
 │    ├── OutfitList.tsx
 │    ├── VibeSwitcher.tsx
 │    ├── LiveLocationToggle.tsx
 │    ├── Toast.tsx
 │    └── OutfitSkeleton.tsx
 ├── hooks/
 │    └── useStylist.ts
 ├── utils/
 │    ├── copyToClipboard.ts
 │    └── getWeatherBackground.ts
 ├── styles/
 │    └── globals.css
 ├── types/
 │    └── index.ts
 └── App.tsx

netlify/
 └── functions/
      └── stylist.ts
```

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Run frontend + serverless functions
netlify dev
```

### Environment variables (local)

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_key_here
OPENWEATHER_API_KEY=your_key_here
```

> `.env` is git-ignored and never committed.

---

## 📈 Performance & UX Considerations

* Motion values tuned for **low jank**
* Staggered rendering to avoid cognitive overload
* Skeleton loaders to prevent layout shifts
* Utility-first CSS for minimal runtime overhead
* No heavy animation libraries beyond Framer Motion

---

## 🧪 Future Enhancements

* User accounts & saved outfits
* Image-based outfit generation
* Seasonal wardrobe analysis
* AI personalization memory
* Usage analytics dashboard

---


## 📄 License

MIT
