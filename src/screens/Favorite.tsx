// src/screens/Favorite.tsx

import React, { useEffect, useState} from "react";
import { 
  View, 
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,  
} from "react-native";
import { Movie } from "../types/app";
import MovieItem from "../components/movies/MovieItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const win = Dimensions.get("window");

export default function Favorite(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  const getFavorites = async (): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem("@FavoriteList");

      let favMovieList: Movie[] = [];

      if (initialData !== null) {
        favMovieList = JSON.parse(initialData);
      }

      setMovies(favMovieList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ marginTop: 20, marginLeft: 15 }}
        data={movies}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10, marginRight: 15 }}>
            <MovieItem
              movie={item}
              size={{width: 100, height: 160,}}
              coverType={"poster"}
            />
          </View>
        )}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: win.width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
