import GlassCard from "./components/GlassCard";
import { useStylist } from "./hooks/useStylist";
import { WeatherView } from "./components/WeatherView";
import { OutfitList } from "./components/OutfitList";
import { VibeSwitcher } from "./components/VibeSwitcher";
import { getWeatherBackground } from "./utils/getWeatherBackground";
import { LiveLocationToggle } from "./components/LiveLocationToggle";
import { OutfitSkeleton } from "./components/OutfitSkeleton";



export default function App() {
  const {
    fetchStylist,
    outfits,
    weather,
    loading,
    vibe,
    setVibe,
    useLiveLocation,
    setUseLiveLocation,
    locationError,
  } = useStylist();

  const backgroundClass = getWeatherBackground(weather);

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-700 ${backgroundClass}`}
    >
      <div className="grid grid-cols-1 gap-6 mx-auto md:grid-cols-3 max-w-7xl">
        
        {/* Left Panel */}
        <GlassCard>
          <h1 className="text-[clamp(1.2rem,4vw,2rem)] font-semibold">
            AI Outfit Stylist
          </h1>

          <p className="mt-2 text-sm text-white/70">
            Weather-aware outfit recommendations
          </p>

          <div className="mt-6">
            <VibeSwitcher vibe={vibe} setVibe={setVibe} />
          </div>
          <div className="mt-4">
            <LiveLocationToggle enabled={useLiveLocation} onToggle={setUseLiveLocation}/>
          </div>

{locationError && (
  <p className="mt-2 text-xs text-red-400">
    {locationError}
  </p>
)}


          <button
            onClick={() => fetchStylist()}

            className="w-full py-2 mt-6 font-medium text-black transition rounded-xl bg-neonBlue hover:opacity-90"
          >
            Generate Outfit
          </button>
        </GlassCard>

        {/* Main Panel */}
        <GlassCard className="md:col-span-2" hover={false}>
        {loading ? (
          <OutfitSkeleton />
            ) : (

            <>
              <WeatherView weather={weather} />
              <div className="mt-6">
                <OutfitList outfits={outfits} />
              </div>
            </>
          )}
        </GlassCard>

      </div>
    </div>
  );
}
