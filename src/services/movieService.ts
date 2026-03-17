import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;

const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${tmdbToken}`,
  },
});

export async function fetchMovies(
  query: string,
  page: number,
): Promise<FetchMoviesResponse> {
  const response = await movieApi.get<FetchMoviesResponse>("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
  });

  return response.data;
}
