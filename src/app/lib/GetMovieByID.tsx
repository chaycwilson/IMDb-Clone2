import { Movie } from "../models/MovieBasic";

export default async function GetMovieByID(movieId: string):Promise<Movie> {
  const API_KEY = process.env.API_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`);
  }

  return res.json();
}
