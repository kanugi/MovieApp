import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getMovieDetails, Movie } from "../api/tmdbApi";
import { RootStackParamList } from "../navigator/StackNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

type MovieDetailScreenRouteProp = RouteProp<RootStackParamList, "MovieDetail">;

type Props = {
  route: MovieDetailScreenRouteProp;
  navigation: StackNavigationProp<RootStackParamList, "MovieDetail">;
};

const MovieDetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

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

  // Mengecek Kondisi faforit film 
  
  // useEffect(() =>
  //   {
  //     checkFavorite(movie.id);
  //   },
  //   [movie]
  // );

  // const checkFavorite = async (id: number): Promise<void> => {
  //   try {
  //     const initialData: string | null =
  //       await AsyncStorage.getItem("@FavoriteList");

  //     let favMovieList: Movie[] = [];

  //     if (initialData !== null) {
  //       favMovieList = JSON.parse(initialData);
  //     }
  //     // console.log(favMovieList);
  //     if (
  //       favMovieList.some((item) => {
  //         return id == item.id;
  //       })
  //     ) {
  //       setIsFavorite(true);
  //     } else {
  //       setIsFavorite(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      let initialData: string | null =
        await AsyncStorage.getItem("@FavoriteList");

      let favMovieList: Movie[] = [];

      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie];
      } else {
        favMovieList = [movie];
      }

      await AsyncStorage.setItem("@FavoriteList", JSON.stringify(favMovieList));
      console.log(initialData);
      initialData = await AsyncStorage.getItem("@FavoriteList");
      console.log(initialData);
      setIsFavorite(true);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      let initialData: string | null =
        await AsyncStorage.getItem("@FavoriteList");
      let favMovieList: Movie[] = [];
      let newMovieList: Movie[] = [];

      if (initialData !== null) {
        favMovieList = JSON.parse(initialData);
      }
      newMovieList = favMovieList.filter((item) => {
        return item.id != id;
      });
      console.log(initialData);
      await AsyncStorage.setItem("@FavoriteList", JSON.stringify(newMovieList));
      initialData = await AsyncStorage.getItem("@FavoriteList");
      console.log(initialData);
      setIsFavorite(false);
    } catch (error) {
      console.log(error);
    }
  };

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
      <TouchableOpacity onPress={() => {
        if (movie != undefined) {
          if (isFavorite) {
            removeFavorite(movie.id);
          } else {
            addFavorite(movie);
          }
        }
        }}
      >
        <FontAwesome name={isFavorite ? "heart" : "heart-o"} size={20} color="red"/>
      </TouchableOpacity>
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
