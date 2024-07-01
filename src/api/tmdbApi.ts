import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjkxMGE1NjI4YzY1NGUxYWU5ZGY5YTIwZDNiODAzOCIsIm5iZiI6MTcxOTQwNTUyMy42Mjg4NTYsInN1YiI6IjY2N2MwYTczYzMxODYyNmUyNDE2YzkwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TV0xMFiw4izku3aBeqHmiz3to1V3MVebDHzYYknya_E";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {}

export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get("/movie/popular?language=en-US&page=1");
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get("/movie/now_playing?language=en-US&page=1");
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUpcomingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get("/movie/upcoming?language=en-US&page=1");
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTopRatedMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get("/movie/top_rated?language=en-US&page=1");
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMovieDetails = async (
  movieId: number
): Promise<MovieDetails | null> => {
  try {
    const response = await api.get(`/movie/${movieId}?language=en-US`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMoviesByKeyword = async (keyword: string): Promise<Movie[]> => {
  try {
    const response = await api.get(
      `/search/movie?query=${keyword}&language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getGenres = async (): Promise<Genre[]> => {
  try {
    const response = await api.get("/genre/movie/list?language=en-US");
    return response.data.genres;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
  try {
    const response = await api.get(
      `/discover/movie?with_genres=${genreId}&language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
