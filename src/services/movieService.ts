import axios from "axios";
import type { FetchMoviesResponse } from "../types/movie";

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
