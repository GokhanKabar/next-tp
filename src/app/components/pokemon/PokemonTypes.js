'use client';

import Image from 'next/image';

export function PokemonTypes({ types }) {
  return (
    <div className="flex gap-4 justify-center">
      {types.map(type => (
        <div key={type.id} className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image
              src={type.image}
              alt={type.name}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg capitalize">{type.name}</span>
        </div>
      ))}
    </div>
  );
}