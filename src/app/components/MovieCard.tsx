"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Movie } from "../models/MovieBasic";
import { FaStar, FaEye, FaCalendarAlt, FaClock } from "react-icons/fa";

export default function MovieCard({ movie }: { movie: Movie }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  if (!movie) {
    return null;
  }

  const handleClick = () => {
    router.push(`/movies/${movie.id}`);
  };

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  
  const {
    title = "Unknown Title",
    release_date = "",
    poster_path = null,
    vote_average = 0,
    overview = "No description available.",
    genre_ids = []
  } = movie;

  const year = release_date ? new Date(release_date).getFullYear() : "N/A";
  const rating = vote_average ? vote_average.toFixed(1) : "N/A";
  
  const posterUrl = poster_path 
    ? `${IMAGE_BASE_URL}${poster_path}` 
    : "https://via.placeholder.com/500x750?text=No+Poster";

  // Calculate a color for the rating
  const getRatingColor = (score) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 6) return "bg-yellow-500";
    if (score >= 4) return "bg-orange-500";
    return "bg-red-500";
  };
  
  // Genre mapping (simplified for common genres)
  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    53: "Thriller"
  };

  // Get primary genre
  const primaryGenre = genre_ids.length > 0 ? genreMap[genre_ids[0]] : null;

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 mt-10 mx-2.5 cursor-pointer h-full group relative"
      style={{ 
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0px)',
        boxShadow: isHovered ? '0 15px 30px rgba(0, 0, 0, 0.2)' : '0 5px 15px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Rating Badge */}
      <div className={`absolute top-3 right-3 ${getRatingColor(vote_average)} text-white rounded-full h-10 w-10 flex items-center justify-center z-10 font-bold shadow-md`}>
        {rating}
      </div>
      
      {/* Genre badge if available */}
      {primaryGenre && (
        <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md z-10">
          {primaryGenre}
        </div>
      )}
      
      <div className="relative pb-[150%] overflow-hidden">
        {/* Poster with overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <img
          src={posterUrl}
          alt={`${title} poster`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Quick info overlay on hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-2 z-20">
          <p className="text-sm font-medium line-clamp-3">{overview}</p>
          <button className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full text-sm flex items-center justify-center gap-2 transition-colors">
            <FaEye /> View Details
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{title}</h3>
        
        <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-1 text-gray-400" />
            <span>{year}</span>
          </div>
          
          <div className="flex items-center">
            <FaStar className="mr-1 text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}