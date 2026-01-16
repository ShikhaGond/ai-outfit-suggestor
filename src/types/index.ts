export type Vibe =
  | "Corporate Sleek"
  | "Streetwear"
  | "Weekend Casual";

export interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
}

export interface StylistResponse {
  weather: WeatherData;
  outfits: string[];
}
