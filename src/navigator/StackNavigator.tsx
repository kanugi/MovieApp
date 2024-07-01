// src/navigations/StackNavigator.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";

export type RootStackParamList = {
  Home: undefined;
  MovieDetail: { id: number };
  Search: undefined;
  Favorite: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
  </Stack.Navigator>
);

export default StackNavigator;
