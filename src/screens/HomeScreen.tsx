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
import { data_avatar, data_video, data_topic } from "../utils/const";

const Item = ({ obj }: { obj: any }) => (
  <Pressable
    style={({ pressed }: { pressed: boolean }) => [
      styles.pressable,
      pressed && styles.pressed,
    ]}
  >
    <View style={styles.iitem}>
      <View style={styles.item}>
        <Image source={obj.img} />
        <Image style={styles.live} source={obj.live} />
      </View>
      <View>
        <Text style={{ marginTop: 20 }}>{obj.name}</Text>
      </View>
    </View>
  </Pressable>
);
const Item2 = ({ obj }: { obj: any }) => (
  <Pressable
    style={({ pressed }: { pressed: boolean }) => [
      styles.pressable,
      pressed && styles.pressed,
    ]}
  >
    <View style={styles.iitem2}>
      <Image source={obj.img} />
    </View>
  </Pressable>
);
const Item3 = ({ obj }: { obj: any }) => (
  <Pressable
    style={({ pressed }: { pressed: boolean }) => [
      styles.pressable,
      pressed && styles.pressed,
    ]}
  >
    <View style={styles.item_topic}>
      <Image source={obj.img} />
      <Text style={{ marginTop: 10 }}>{obj.name}</Text>
    </View>
  </Pressable>
);

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
          <FlatList
            data={data_avatar}
            renderItem={({ item }) => <Item obj={item} />}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.topTrending}>
          <Text style={styles.textTrend}>Top trending</Text>
          <Pressable
            style={({ pressed }: { pressed: boolean }) => [
              styles.pressable,
              pressed && styles.pressed,
            ]}
          >
            <Text style={{ color: "red", marginRight: 40 }}>View more</Text>
          </Pressable>
        </View>
        <View>
          <FlatList
            data={data_video}
            renderItem={({ item }) => <Item2 obj={item} />}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.center}
          />
        </View>
        <View style={{}}>
          <Text style={styles.textTrend}>Browse topic</Text>
          <View>
            <FlatList
              data={data_topic}
              renderItem={({ item }) => <Item3 obj={item} />}
              keyExtractor={(item) => item.id}
              numColumns={4}
              columnWrapperStyle={styles.topic_data}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 45,
    marginHorizontal: 20,
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
  banner: {
    marginTop: 15,
  },
  item: {
    width: 40,
    height: 40,
  },
  iitem: {
    alignItems: "center",
    marginRight: 20,
  },
  iitem2: {
    marginRight: 15,
    marginTop: 10,
  },
  center: {
    alignItems: "center",
  },
  live: {
    position: "absolute",
    bottom: -14,
    right: -13,
  },

  text: {
    fontSize: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textTrend: {
    fontSize: 23,
    fontWeight: "600",
    opacity: 0.6,
  },
  topTrending: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  topic_data: {
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  item_topic: {
    backgroundColor: "#F8F9FA",
    marginRight: 10,
    padding: 10,
    width: 75,
    height: 70,
    alignItems: "center",
  },
});
export default HomeScreen;
