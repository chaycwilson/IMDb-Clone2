// page.js (Server Component)
import MovieClient from './components/MovieClient';

export default async function Home({ searchParams }) {
  const genre = searchParams.genre || 'popular';
  
  // Make sure your access token is correctly set in .env.local
  const ACCESS_TOKEN = process.env.API_KEY;
  
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    };
    
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${genre}?language=en-US&page=1`, 
      options
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }
    
    const data = await res.json();
    
    // Pass the fetched data to the client component
    return (
      <div>
        <MovieClient initialMovies={data.results} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div>
        <h1>Error loading movies</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}