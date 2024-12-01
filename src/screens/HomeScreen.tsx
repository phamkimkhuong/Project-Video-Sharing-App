import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  ImageBackground,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import axios from "axios";
import {
  data_avatar,
  data_video,
  data_topic,
  data_stream,
  serverURL,
} from "../utils/const";
type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
};

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
const ItemTopTrending = ({ obj }: { obj: any }) => (
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
const ItemBrowseTopic = ({ obj }: { obj: any }) => (
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
const ItemStream = ({ obj }: { obj: any }) => (
  <Pressable
    style={({ pressed }: { pressed: boolean }) => [
      styles.pressable,
      pressed && styles.pressed,
    ]}
  >
    <View style={styles.streaming}>
      <ImageBackground style={styles.background} source={obj.img}>
        <Pressable
          style={({ pressed }: { pressed: boolean }) => [
            styles.pressable,
            styles.btn,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.header}>
            <Entypo
              name="circle"
              size={1}
              color="white"
              style={styles.iconbtn}
            />
            <Text style={{ color: "white" }}>{obj.btn}</Text>
          </View>
        </Pressable>
        <View style={[styles.header, { marginHorizontal: 6, marginBottom: 5 }]}>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 16, color: "white" }}>{obj.name}</Text>
            <View style={styles.header}>
              <Image source={obj.play} />
              <Text style={{ color: "white", fontSize: 10 }}>{obj.view}</Text>
            </View>
          </View>
          <Image source={obj.avatar} />
        </View>
      </ImageBackground>
    </View>
  </Pressable>
);

const HomeScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const user = route.params?.userData ?? {};
  const [images, setImages] = useState<any[]>([]);
  const [stories, setStory] = useState<any[]>([]);
  const [user1, setUser] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${serverURL}/imageStreaming4`);
      if (Array.isArray(response.data) && response.data.length > 0) {
        // gán dữ liệu vào stories
        setImages(response.data);
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };
  const fetchDataUser = async () => {
    try {
      const response = await axios.get(`${serverURL}/data?id=${user.idUser}`);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  const fetchStories = async () => {
    try {
      const response = await axios.get(`${serverURL}/Userstories`);
      setStory(response.data);
    } catch (error) {
      console.error("Error fetching stories:", error);
      Alert.alert("Lỗi", "Không thể lấy danh sách story");
    }
  };
  useEffect(() => {
    fetchDataUser();
    fetchData();
    fetchStories();
  }, []);
  const renderItem1 = ({ item }: { item: any }) => {
    const maxLength = 7;
    const displayName =
      item.username.length > maxLength
        ? item.username.slice(0, maxLength) + "..."
        : item.username;

    return (
      <TouchableOpacity
        style={styles.padTouch}
        onPress={() => navigation.navigate("StoryDetails", { userData: user })}
      >
        <Image
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: "#0099FF",
          }}
          source={{ uri: item.avatar }}
        />
        <Text style={{}}>{displayName}</Text>
      </TouchableOpacity>
    );
  };
  return (
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
      {/* <View style={styles.banner}>
        <FlatList
          data={data_avatar}
          renderItem={({ item }) => <Item obj={item} />}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View> */}
      {/* Story Section */}
      <SafeAreaView style={styles.listStory}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => navigation.navigate("CreateStory", { userData: user })}
        >
          <Image
            style={{ height: 50, width: 50, borderRadius: 50 }}
            source={{ uri: user.avatar }}
          />
          <Text>You</Text>
        </TouchableOpacity>

        <FlatList
          data={stories}
          renderItem={renderItem1}
          keyExtractor={(item) => item.idPost}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>

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
          renderItem={({ item }) => <ItemTopTrending obj={item} />}
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
            renderItem={({ item }) => <ItemBrowseTopic obj={item} />}
            keyExtractor={(item) => item.id}
            numColumns={4}
            columnWrapperStyle={styles.topic_data}
          />
        </View>
      </View>
      <View style={styles.topTrending}>
        <Text style={styles.textTrend}>Streaming</Text>
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
          data={data_stream}
          renderItem={({ item }) => <ItemStream obj={item} />}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.streaming2}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginBottom: 5,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listStory: {
    paddingVertical: 15,
    flexDirection: "row",
  },
  padTouch: {
    paddingHorizontal: 10,
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
    marginTop: 10,
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
  btn: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    width: 70,
    height: 20,
    marginVertical: 7,
    marginHorizontal: 3,
  },
  iconbtn: {
    width: 8,
    height: 8,
    backgroundColor: "white",
    borderRadius: 100,
    marginRight: 2,
  },
  streaming: {
    marginRight: 13,
    width: 140,
    height: 170,
  },
  streaming2: {
    alignItems: "center",
  },
  background: {
    flex: 1, // Để chiếm toàn bộ không gian
    justifyContent: "space-between",
  },
});
export default HomeScreen;
