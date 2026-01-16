export function OutfitSkeleton() {
  return (
    <div className="space-y-4">
      <div className="w-32 h-4 rounded-md shimmer" />

      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="shimmer h-14 rounded-xl bg-white/10"
        />
      ))}
    </div>
  );
}
