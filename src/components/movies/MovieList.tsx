// src/components/movies/MovieList.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import MovieItem from "./MovieItem";
import { Movie } from "../../types/app";

interface MovieListProps {
  title: string;
  path: string;
  coverType: "poster" | "backdrop";
}

const MovieList: React.FC<MovieListProps> = ({ title, path, coverType }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${path}`,
          {
            headers: {
              Authorization: "Bearer YOUR_API_KEY_HERE",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [path]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            size={{ width: 120, height: 180 }}
            coverType={coverType}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default MovieList;
