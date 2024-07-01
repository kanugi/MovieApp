import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getMovieDetails, Movie } from "../api/tmdbApi";
import { RootStackParamList } from "../navigator/StackNavigator";

type MovieDetailScreenRouteProp = RouteProp<RootStackParamList, "MovieDetail">;

type Props = {
  route: MovieDetailScreenRouteProp;
  navigation: StackNavigationProp<RootStackParamList, "MovieDetail">;
};

const MovieDetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const movieDetails = await getMovieDetails(id);
      setMovie(movieDetails);
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{movie.title}</Text>
      <Text style={styles.movieOverview}>{movie.overview}</Text>
      <Text style={styles.movieDetails}>
        Release Date: {movie.release_date}
      </Text>
      <Text style={styles.movieDetails}>Rating: {movie.vote_average}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  movieImage: {
    width: "100%",
    height: 500,
    borderRadius: 10,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  movieOverview: {
    fontSize: 16,
    marginVertical: 10,
  },
  movieDetails: {
    fontSize: 14,
    marginVertical: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MovieDetailScreen;
