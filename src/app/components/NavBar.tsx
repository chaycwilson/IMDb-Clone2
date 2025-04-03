"use client"

import Link from "next/link";
import { FaImdb } from "react-icons/fa";
import { CgDarkMode } from "react-icons/cg";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function NavBar() {
  const [theme, setTheme] = useState("light");
  
  return (
    <header className="bg-gray-700 text-white">
      <nav className="flex flex-col md:flex-row justify-between items-center p-4 max-w-7xl mx-auto gap-4">
        {/* Logo and Brand */}
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <FaImdb className="text-yellow-400 text-3xl" />
          <span>IMDb Clone</span>
        </Link>

        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            <li className="hover:text-yellow-400 transition-colors">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-yellow-400 transition-colors">
              <Link href="/about">About</Link>
            </li>
            <li className="hover:text-yellow-400 transition-colors cursor-pointer">
              <CgDarkMode className="text-2xl" />
            </li>
          </ul>
          
          <div className="w-full md:w-auto">
            <SearchBar />
          </div>
        </div>
      </nav>
    </header>
  );
}