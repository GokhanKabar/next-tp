'use client';

export function PokemonStats({ stats }) {
  return (
    <div className="space-y-4">
      {Object.entries(stats).map(([stat, value]) => (
        <div key={stat} className="flex items-center justify-between px-4 py-2 rounded-lg">
          <span className="text-gray-600">{stat}</span>
          <span className="font-semibold text-lg">{value}</span>
        </div>
      ))}
    </div>
  );
}