import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { RootStackParamList } from "./StackNavigator";
import StackNavigator from "./StackNavigator";
import Search from "../screens/Search";
import Favorite from "../screens/Favorite";

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={StackNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="search" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Favorite"
      component={Favorite}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="heart" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;
