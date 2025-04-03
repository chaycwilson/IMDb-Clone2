import { Movie } from "../models/MovieBasic"


export default async function GetBySearch(searchTerm: string): Promise<Movie[]> {

    const API_KEY = process.env.API_KEY
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };

    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`, options)

  const data = await res.json()
  return data.results;
}
