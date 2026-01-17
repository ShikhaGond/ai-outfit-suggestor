import { useState } from "react";
import type { Vibe, WeatherData, StylistResponse } from "../types";

interface FetchParams {
  lat?: number;
  lon?: number;
  city?: string;
}

export function useStylist() {
  const [loading, setLoading] = useState(false);
  const [outfits, setOutfits] = useState<string[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [vibe, setVibe] = useState<Vibe>("Corporate Sleek");
  const [useLiveLocation, setUseLiveLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [hasRequested, setHasRequested] = useState(false);


  const fetchStylist = async (params?: FetchParams) => {
    setHasRequested(true);
    setLoading(true);
    setLocationError(null);

    try {
      let payload: FetchParams & { vibe: Vibe };

      if (useLiveLocation) {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000,
            });
          }
        );

        payload = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          vibe,
        };
      } else {
        payload = {
          city: params?.city ?? "Mumbai",
          vibe,
        };
      }

      const res = await fetch("/api/stylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: StylistResponse = await res.json();
      setWeather(data.weather);
      setOutfits(data.outfits);
    } catch (error) {
      setLocationError("Unable to access live location.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchStylist,
    outfits,
    weather,
    loading,
    vibe,
    setVibe,
    useLiveLocation,
    setUseLiveLocation,
    locationError,
    hasRequested,

  };
}
