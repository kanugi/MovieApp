// src/utils/favoriteUtils.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "../api/tmdbApi";

// Fungsi untuk menambahkan film ke daftar favorit
export const addFavorite = async (movie: Movie): Promise<void> => {
  try {
    const initialData: string | null = await AsyncStorage.getItem(
      "@FavoriteList"
    );
    let favMovieList: Movie[] =
      initialData !== null ? JSON.parse(initialData) : [];
    favMovieList.push(movie);
    await AsyncStorage.setItem("@FavoriteList", JSON.stringify(favMovieList));
  } catch (error) {
    console.log(error);
  }
};

// Fungsi untuk menghapus film dari daftar favorit
export const removeFavorite = async (id: number): Promise<void> => {
  try {
    const initialData: string | null = await AsyncStorage.getItem(
      "@FavoriteList"
    );
    if (initialData !== null) {
      let favMovieList: Movie[] = JSON.parse(initialData);
      favMovieList = favMovieList.filter((movie) => movie.id !== id);
      await AsyncStorage.setItem("@FavoriteList", JSON.stringify(favMovieList));
    }
  } catch (error) {
    console.log(error);
  }
};

// Fungsi untuk memeriksa apakah film ada di daftar favorit
export const checkIsFavorite = async (id: number): Promise<boolean> => {
  try {
    const initialData: string | null = await AsyncStorage.getItem(
      "@FavoriteList"
    );
    if (initialData !== null) {
      const favMovieList: Movie[] = JSON.parse(initialData);
      return favMovieList.some((movie) => movie.id === id);
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
