"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <div className="flex items-center border border-gray-300 rounded-full shadow-sm bg-white overflow-hidden px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500">
        <Search className="w-5 h-5 text-gray-400 mr-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for phones, laptops, TVs, headphones..."
          className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm md:text-base"
        />
        {loading ? (
          <Loader2 className="w-5 h-5 text-indigo-600 animate-spin ml-2" />
        ) : (
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-indigo-700 transition"
          >
            Compare
          </button>
        )}
      </div>
    </form>
  );
}
