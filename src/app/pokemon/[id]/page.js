'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PokemonTypes, PokemonStats, PokemonEvolution } from '@/app/components/pokemon';

export default function PokemonDetail({ params }) {
  const pokemonId = use(params).id;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://nestjs-pokedex-api.vercel.app/pokemons/${pokemonId}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('Erreur lors de la récupération du pokemon :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [pokemonId]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-2xl">Chargement...</div>;
  }

  if (!pokemon) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <button className="mb-8 px-6 py-2 bg-white text-gray-800 rounded-lg shadow hover:shadow-md transition-shadow flex items-center gap-2 border border-gray-200">
            <span>Retour à la liste</span>
          </button>
        </Link>
        <div>Pokémon non trouvé</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
        <button className="mb-8 px-6 py-2 bg-white text-gray-800 rounded-lg shadow hover:shadow-md transition-shadow flex items-center gap-2 border border-gray-200">
          <span>Retour à la liste</span>
        </button>
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">
              {pokemon.name} #{pokemon.pokedexId}
            </h1>
            <div className="relative h-64 w-64 mx-auto mb-6">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <PokemonTypes types={pokemon.types} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Statistiques</h2>
            <PokemonStats stats={pokemon.stats} />
          </div>
        </div>

        {pokemon.evolutions?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-6">Évolution</h2>
            <Link href={`/pokemon/${pokemon.evolutions[0].pokedexId}`}>
              <PokemonEvolution 
                currentPokemon={pokemon} 
                evolution={pokemon.evolutions[0]} 
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}