import type { WeatherData } from "../types";

export function getWeatherBackground(weather: WeatherData | null): string {
  if (!weather) {
    return "bg-gradient-to-br from-black to-electricViolet/20";
  }

  const condition = weather.weather[0].main.toLowerCase();

  if (condition.includes("rain")) {
    return "bg-gradient-to-br from-slate-900 via-blue-900 to-black";
  }

  if (condition.includes("cloud")) {
    return "bg-gradient-to-br from-zinc-900 via-neutral-800 to-black";
  }

  if (condition.includes("snow")) {
    return "bg-gradient-to-br from-slate-200 via-slate-400 to-slate-600 text-black";
  }

  if (condition.includes("fog") || condition.includes("mist")) {
    return "bg-gradient-to-br from-gray-800 via-gray-900 to-black";
  }

  // clear / sunny fallback
  return "bg-gradient-to-br from-black via-electricViolet/30 to-black";
}
