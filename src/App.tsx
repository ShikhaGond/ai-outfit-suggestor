import GlassCard from "./components/GlassCard";
import { WeatherView } from "./components/WeatherView";
import { OutfitList } from "./components/OutfitList";
import { VibeSwitcher } from "./components/VibeSwitcher";
import { LiveLocationToggle } from "./components/LiveLocationToggle";
import { OutfitSkeleton } from "./components/OutfitSkeleton";

import { useStylist } from "./hooks/useStylist";
import { getWeatherBackground } from "./utils/getWeatherBackground";

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
    hasRequested,
  } = useStylist();

  const backgroundClass = getWeatherBackground(weather);

  return (
    <main
      className={`
        min-h-screen
        p-4 sm:p-6
        transition-colors duration-700
        ${backgroundClass}
      `}
    >
      <div className="grid grid-cols-1 gap-6 mx-auto lg:grid-cols-3 lg:gap-8 max-w-7xl">
        
        {/* LEFT: Controls */}
        <section aria-label="Outfit controls">
          <GlassCard>
            <h1 className="text-[clamp(1.25rem,4vw,2rem)] font-semibold">
              AI Outfit Stylist
            </h1>

            <p className="mt-2 text-sm text-white/70">
              Weather-aware outfit recommendations
            </p>

            <div className="mt-6">
              <VibeSwitcher vibe={vibe} setVibe={setVibe} />
            </div>

            <div className="mt-4">
              <LiveLocationToggle
                enabled={useLiveLocation}
                onToggle={setUseLiveLocation}
              />
            </div>

            {hasRequested && locationError && (
              <p
                role="alert"
                aria-live="assertive"
                className="mt-2 text-xs text-red-400"
              >
                {locationError}
              </p>
            )}

            <button
              onClick={() => fetchStylist()}
              className="w-full py-2 mt-6 font-medium text-black transition  rounded-xl bg-neonBlue hover:opacity-90"
            >
              Generate Outfit
            </button>
          </GlassCard>
        </section>

        {/* RIGHT: Results */}
        <section
          aria-label="Outfit results"
          className="lg:col-span-2"
        >
          <GlassCard hover={false}>
            {loading && <OutfitSkeleton />}

            {!loading && weather && (
              <>
                <WeatherView weather={weather} />
                <div className="mt-6">
                  <OutfitList outfits={outfits} />
                </div>
              </>
            )}

            {!loading && !weather && (
              <p className="text-sm text-white/50">
                Generate an outfit to see recommendations here.
              </p>
            )}
          </GlassCard>
        </section>

      </div>
    </main>
  );
}
