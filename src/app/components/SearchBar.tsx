"use client";

import { FormEvent, useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes, FaFilm, FaHistory } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Load search history on component mount
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history).slice(0, 5));
    }
  }, []);

  // Handle clicks outside the search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowHistory(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      performSearch(search);
    }
  };

  const performSearch = (term: string) => {
    // Update search history
    const updatedHistory = [term, ...searchHistory.filter(item => item !== term)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    
    // Navigate to search page
    router.push(`/search?query=${encodeURIComponent(term)}`);
    setSearch("");
    setShowHistory(false);
  };

  const clearSearch = () => {
    setSearch("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const clearHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const handleHistoryItemClick = (term: string) => {
    performSearch(term);
  };

  return (
    <div className="relative" ref={searchContainerRef}>
      <form onSubmit={handleSubmit} className="w-full md:w-auto">
        <div className={`flex items-center relative bg-gray-800 rounded-md overflow-hidden transition-all duration-200 ${isFocused ? 'ring-2 ring-yellow-400' : ''}`}>
          <div className="px-3 text-gray-400">
            <FaSearch />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search movies..."
            className="w-full py-2 px-2 text-sm text-white bg-transparent border-none focus:outline-none focus:ring-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowHistory(true);
            }}
          />
          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="px-3 text-gray-400 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 text-gray-900 font-medium hover:bg-yellow-400 transition-colors"
            aria-label="Search"
          >
            Search
          </button>
        </div>
      </form>

      {/* Search History Dropdown */}
      {showHistory && searchHistory.length > 0 && (
        <div className="absolute mt-1 w-full bg-gray-800 rounded-md shadow-lg py-1 z-50">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-700">
            <span className="text-sm font-medium text-gray-400">Recent Searches</span>
            <button 
              onClick={clearHistory}
              className="text-xs text-gray-500 hover:text-white"
            >
              Clear
            </button>
          </div>
          <ul>
            {searchHistory.map((term, index) => (
              <li key={index}>
                <button
                  className="w-full text-left flex items-center px-3 py-2 text-sm text-white hover:bg-gray-700"
                  onClick={() => handleHistoryItemClick(term)}
                >
                  <FaHistory className="mr-2 text-gray-500" />
                  {term}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search suggestions - can be implemented if you have an API for this */}
      {isFocused && search && (
        <div className="absolute mt-1 w-full bg-gray-800 rounded-md shadow-lg py-1 z-50">
          <div className="px-3 py-2 border-b border-gray-700">
            <span className="text-sm font-medium text-gray-400">Search for "{search}"</span>
          </div>
          <button
            className="w-full text-left flex items-center px-3 py-2 text-sm text-white hover:bg-gray-700"
            onClick={() => performSearch(search)}
          >
            <FaFilm className="mr-2 text-yellow-500" />
            Show results for "{search}"
          </button>
        </div>
      )}
    </div>
  );
}