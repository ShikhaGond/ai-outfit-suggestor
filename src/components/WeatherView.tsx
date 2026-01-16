import { Cloud } from "lucide-react";
import type { WeatherData } from "../types";

interface WeatherViewProps {
  weather: WeatherData | null;
}

export function WeatherView({ weather }: WeatherViewProps) {
  if (!weather) return null;

  return (
    <div className="flex items-center gap-3">
      <Cloud />
      <div>
        <p className="text-sm">{weather.name}</p>
        <p className="text-lg font-semibold">
          {weather.main.temp}°C
        </p>
      </div>
    </div>
  );
}
