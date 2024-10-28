import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { data_avatar } from "../utils/const";
const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header}>
            <Image source={require("../assets/home/logo.png")} />
            <Text style={styles.title}>Video Sharing App</Text>
          </View>
          <Pressable
            style={({ pressed }: { pressed: boolean }) => [
              styles.pressable,
              pressed && styles.pressed,
            ]}
            android_ripple={{ color: "lightgray" }}
          >
            <Ionicons name="notifications-outline" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.banner}>
          <FlatList data={data_avatar} />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 45,
    marginHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pressable: {
    // Default style
    opacity: 1,
  },
  pressed: {
    opacity: 0.5, // Change when pressed
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "600",
  },
  banner: {},
  text: {
    fontSize: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
export default HomeScreen;
