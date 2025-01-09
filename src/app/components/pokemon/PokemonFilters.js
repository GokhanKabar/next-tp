'use client';

export function PokemonFilters({ filters, allTypes, onFilterChange }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={onFilterChange}
        placeholder="Search"
        className="px-4 py-2 border rounded-lg"
      />
      
      <select
        name="type"
        value={filters.type}
        onChange={onFilterChange}
        className="px-4 py-2 border rounded-lg"
      >
        <option value="">Tous les types</option>
        {allTypes.map(type => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>

      <select
        name="limit"
        value={filters.limit}
        onChange={onFilterChange}
        className="px-4 py-2 border rounded-lg"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}