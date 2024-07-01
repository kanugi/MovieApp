// src/screens/Favorite.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "../api/tmdbApi";
import MovieItem from "../components/movies/MovieItem";

export default function Favorite(): JSX.Element {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await AsyncStorage.getItem("@FavoriteList");
        if (data !== null) {
          setFavoriteMovies(JSON.parse(data));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Movies</Text>
      <FlatList
        data={favoriteMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.movieItemContainer}>
            <MovieItem
              movie={item}
              size={{ width: 120, height: 180 }}
              coverType="poster"
            />
          </TouchableOpacity>
        )}
        numColumns={Math.floor(Dimensions.get("window").width / 140)}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  row: {
    justifyContent: "center",
    marginBottom: 10,
  },
  movieItemContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
});
