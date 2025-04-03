// app/search/page.tsx
import GetBySearch from "@/app/lib/GetBySearch";
import { Movie } from "@/app/models/MovieBasic";
import MovieCard from "@/app/components/MovieCard";


// const Props = {
//   searchParams: {
//     query: string
//   }
// }

export default async function SearchResults({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  // Get the query from searchParams, not params
  const query = searchParams.query;
  
  
  if (!query) {
    return <div>No search query provided</div>;
  }
  
  try {
    const movies = await GetBySearch(query);
    
    console.log("Search data type:", typeof movies);
    console.log("Search data:", movies);
    
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Search error:", error);
    return <div>Error loading search results</div>;
  }
}