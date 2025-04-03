import React from 'react'
import GetMovieByID from '@/app/lib/GetMovieByID'
import { Movie } from '@/app/models/MovieBasic'
import Image from 'next/image'

type Props = {
  params: {
    id: string
  }
}

export default async function MovieDetails({params}: Props) {
  const movie: Movie = await GetMovieByID(params.id)
  
  // Format release date
  const releaseDate = new Date(movie.release_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  // Calculate runtime in hours and minutes
  const hours = Math.floor(movie.runtime / 60)
  const minutes = movie.runtime % 60
  const formattedRuntime = `${hours}h ${minutes}m`
  
  // Format budget and revenue with commas
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount)
  }
  
  // Image base URL
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"
  
  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Backdrop Image with Gradient Overlay */}
      {movie.backdrop_path && (
        <div className="absolute top-0 left-0 w-full h-[70vh] z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10" />
          <img
            src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
            alt={`${movie.title} backdrop`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
            <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
              <img
                src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '/placeholder.jpg'}
                alt={`${movie.title} poster`}
                className="w-full h-auto"
              />
            </div>
            
            {/* Movie Stats in Mobile */}
            <div className="md:hidden mt-6 space-y-4">
              <MovieStats movie={movie} formatCurrency={formatCurrency} />
            </div>
          </div>
          
          {/* Details */}
          <div className="md:w-2/3 lg:w-3/4">
            <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="mt-2 text-xl text-gray-400 italic">"{movie.tagline}"</p>
            )}
            
            {/* Info Bar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-gray-300">
              <span>{releaseDate}</span>
              <span>•</span>
              <span>{formattedRuntime}</span>
              <span>•</span>
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map(genre => (
                  <span 
                    key={genre.id} 
                    className="inline-block px-3 py-1 bg-gray-800 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Rating */}
            <div className="mt-6 flex items-center">
              <div className="relative h-16 w-16 flex items-center justify-center rounded-full bg-gray-800 border-4 border-blue-500">
                <span className="text-xl font-bold">{movie.vote_average?.toFixed(1)}</span>
              </div>
              <div className="ml-4">
                <p className="text-lg font-semibold">User Score</p>
                <p className="text-gray-400">{movie.vote_count?.toLocaleString()} votes</p>
              </div>
            </div>
            
            {/* Overview */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-3">Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>
            </div>
            
            {/* Desktop Movie Stats */}
            <div className="hidden md:block mt-10">
              <h2 className="text-2xl font-bold mb-4">Movie Info</h2>
              <MovieStats movie={movie} formatCurrency={formatCurrency} />
            </div>
            
            {/* Production Companies */}
            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Production</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {movie.production_companies.map(company => (
                    <div key={company.id} className="flex flex-col items-center bg-gray-800 p-4 rounded-lg">
                      {company.logo_path ? (
                        <img
                          src={`${IMAGE_BASE_URL}${company.logo_path}`}
                          alt={company.name}
                          className="h-12 object-contain mb-3"
                        />
                      ) : (
                        <div className="h-12 flex items-center justify-center mb-3">
                          <span className="text-xl font-bold">{company.name.charAt(0)}</span>
                        </div>
                      )}
                      <p className="text-center text-sm">{company.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Stats component to reuse in mobile and desktop
function MovieStats({ movie, formatCurrency }: { movie: Movie, formatCurrency: (n: number) => string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
      <div>
        <h3 className="text-gray-400 font-medium">Status</h3>
        <p>{movie.status}</p>
      </div>
      
      <div>
        <h3 className="text-gray-400 font-medium">Original Language</h3>
        <p>{movie.spoken_languages?.find(lang => lang.iso_639_1 === movie.original_language)?.english_name || movie.original_language}</p>
      </div>
      
      {movie.budget > 0 && (
        <div>
          <h3 className="text-gray-400 font-medium">Budget</h3>
          <p>{formatCurrency(movie.budget)}</p>
        </div>
      )}
      
      {movie.revenue > 0 && (
        <div>
          <h3 className="text-gray-400 font-medium">Revenue</h3>
          <p>{formatCurrency(movie.revenue)}</p>
        </div>
      )}
      
      {movie.imdb_id && (
        <div>
          <h3 className="text-gray-400 font-medium">IMDB</h3>
          <a 
            href={`https://www.imdb.com/title/${movie.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            View on IMDB
          </a>
        </div>
      )}
      
      {movie.homepage && (
        <div>
          <h3 className="text-gray-400 font-medium">Website</h3>
          <a 
            href={movie.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline truncate block"
          >
            {new URL(movie.homepage).hostname}
          </a>
        </div>
      )}
    </div>
  )
}