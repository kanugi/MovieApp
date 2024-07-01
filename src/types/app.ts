// src/types/app.ts
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
}

export interface MovieItemProps {
  movie: Movie;
  size: { width: number; height: number };
  coverType: "poster" | "backdrop";
}

export interface MovieListProps {
  title: string;
  path: string;
  coverType: "poster" | "backdrop";
}

// src/types.ts
export type RootStackParamList = {
  Home: undefined;
  MovieDetail: { id: number };
};

export type RootTabParamList = {
  HomeStack: undefined;
  Search: undefined;
  Favorite: undefined;
};
