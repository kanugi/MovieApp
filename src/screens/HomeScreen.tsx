import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  Movie,
} from "../api/tmdbApi";
import MovieItem from "../components/movies/MovieItem";

const movieLists = [
  {
    title: "Now Playing in Theater",
    fetchMovies: getNowPlayingMovies,
    coverType: "backdrop" as "backdrop" | "poster", // Tambahkan tipe eksplisit
  },
  {
    title: "Upcoming Movies",
    fetchMovies: getUpcomingMovies,
    coverType: "poster" as "backdrop" | "poster", // Tambahkan tipe eksplisit
  },
  {
    title: "Top Rated Movies",
    fetchMovies: getTopRatedMovies,
    coverType: "poster" as "backdrop" | "poster", // Tambahkan tipe eksplisit
  },
  {
    title: "Popular Movies",
    fetchMovies: getPopularMovies,
    coverType: "poster" as "backdrop" | "poster", // Tambahkan tipe eksplisit
  },
];

const HomeScreen: React.FC = () => {
  const [movies, setMovies] = useState<{ [key: string]: Movie[] }>({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      const results = await Promise.all(
        movieLists.map(async (list) => ({
          title: list.title,
          movies: await list.fetchMovies(),
        }))
      );
      const moviesByCategory = results.reduce((acc, curr) => {
        acc[curr.title] = curr.movies;
        return acc;
      }, {} as { [key: string]: Movie[] });
      setMovies(moviesByCategory);
    };

    fetchMovies();
  }, []);

  const handleMoviePress = (id: number) => {
    navigation.navigate("MovieDetail", { id });
  };

  const renderMovieSection = (
    title: string,
    movies: Movie[],
    coverType: "poster" | "backdrop"
  ) => (
    <View style={styles.section} key={title}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMoviePress(item.id)}>
            <MovieItem
              movie={item}
              size={{ width: 120, height: 180 }}
              coverType={coverType}
            />
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <StatusBar translucent={false} />
      {movieLists.map((list) =>
        renderMovieSection(list.title, movies[list.title] || [], list.coverType)
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight ?? 32,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 8,
  },
});

export default HomeScreen;
