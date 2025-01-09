'use client';

import Image from 'next/image';
import Link from 'next/link';

export function PokemonCard({ pokemon }) {
  return (
    <Link href={`/pokemon/${pokemon.pokedexId}`}>
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-xl font-semibold">
          {pokemon.name} #{pokemon.pokedexId}
        </h3>
        <div className="relative h-40 w-40 mx-auto my-4">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex gap-2">
          {pokemon.types.map(type => (
            <div key={type.id} className="h-6 w-6 relative">
              <Image
                src={type.image}
                alt={type.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}