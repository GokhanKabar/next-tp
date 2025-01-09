'use client';

import Image from 'next/image';

export function PokemonEvolution({ currentPokemon, evolution }) {
  return (
    <div className="flex items-center justify-center gap-8">
      <div className="flex flex-col items-center">
        <div className="relative h-32 w-32">
          <Image
            src={currentPokemon.image}
            alt={currentPokemon.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <span className="mt-2 font-semibold">{currentPokemon.name}</span>
        <span className="text-gray-500">#{currentPokemon.pokedexId}</span>
      </div>

      <span className="text-3xl">upgrade en</span>

      <div className="flex flex-col items-center hover:scale-105 transition-transform">
        <div className="relative h-32 w-32">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.pokedexId}.png`}
            alt={evolution.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <span className="mt-2 font-semibold">{evolution.name}</span>
        <span className="text-gray-500">#{evolution.pokedexId}</span>
      </div>
    </div>
  );
}