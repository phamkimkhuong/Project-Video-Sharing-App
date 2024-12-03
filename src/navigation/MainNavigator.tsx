import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import CreateVideoScreen from "../screens/CreateVideoScreen";
import FriendsScreen from "../screens/FriendsScreen";
import EditingPage from "../screens/EditingPage";
import Login from "../screens/LoginScreen";
import { Props } from "../utils/const";

import { PRIMARY_COLOR } from "../utils/const";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const CreateVideoNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Create Video" component={CreateVideoScreen} />
      <Stack.Screen name="Editing" component={EditingPage} />
    </Stack.Navigator>
  );
};
const LoginNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainNavigator: React.FC<Props> = ({ navigation, route }: Props) => {
  const { userData } = route.params || {};
  return (
    <Tab.Navigator
      // initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: "gray",
        style: {
          borderRadius: 15,
          height: 10,
        },
        tabBarStyle: {
          display: route.name === "Create Video" ? "none" : "flex",
          backgroundColor: "white",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Create Video") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Friends") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        initialParams={{ userData }}
        component={HomeScreen}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Create Video" component={CreateVideoNavigator} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default LoginNavigator;
