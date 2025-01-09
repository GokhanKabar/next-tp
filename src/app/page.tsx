"use client";

import { useState, useEffect, useCallback } from "react";
import { PokemonCard, PokemonFilters } from "@/app/components/pokemon";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    name: "",
    type: "",
    limit: "50",
  });
  const [allTypes, setAllTypes] = useState([]);

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined" || loading || !hasMore) return;

    const scrolledToBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100;

    if (scrolledToBottom) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(
          "https://nestjs-pokedex-api.vercel.app/types"
        );
        const data = await response.json();
        setAllTypes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des types:", error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const url = new URL("https://nestjs-pokedex-api.vercel.app/pokemons");
        url.searchParams.append("page", page.toString());
        url.searchParams.append("limit", filters.limit);
        if (filters.name) url.searchParams.append("name", filters.name);
        if (filters.type) url.searchParams.append("typeId", filters.type);

        const response = await fetch(url.toString());
        const data = await response.json();

        if (data.length === 0) {
          setHasMore(false);
        } else {
          setHasMore(data.length >= parseInt(filters.limit));
          const newData = data.map((pokemon, index) => ({
            ...pokemon,
            uniqueId: `${pokemon.pokedexId}-${page}-${index}`,
          }));
          setPokemons((prev) => (page === 1 ? newData : [...prev, ...newData]));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des pokemons :", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [page, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
    setPokemons([]);
    setHasMore(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-white">Pokedex</h1>
      <PokemonFilters
        filters={filters}
        allTypes={allTypes}
        onFilterChange={handleFilterChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.uniqueId} // Utilisation de l'ID unique
            pokemon={pokemon}
          />
        ))}
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block text-lg text-black">
            Chargement de Pokemon...
          </div>
        </div>
      )}
    </div>
  );
}
