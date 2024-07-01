import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { getGenres, getMoviesByGenre, Genre, Movie } from "../../api/tmdbApi";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/StackNavigator";

const CategorySearch = (): JSX.Element => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchGenres = async () => {
      const genreList = await getGenres();
      setGenres(genreList);
    };

    fetchGenres();
  }, []);

  const handleGenreSelect = async (genreId: number) => {
    setSelectedGenre(genreId);
    const results = await getMoviesByGenre(genreId);
    setMovies(results);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={genres}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              ...styles.genreItem,
              backgroundColor:
                item.id === selectedGenre ? "#8978A4" : "#C0B4D5",
            }}
            onPress={() => handleGenreSelect(item.id)}
          >
            <Text style={styles.genreText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("MovieDetail", { id: item.id })}
          >
            <Text style={styles.movieItem}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  genreItem: {
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  genreText: {
    color: "white",
    fontSize: 16,
  },
  movieItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default CategorySearch;
