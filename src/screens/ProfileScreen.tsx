import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { serverURL, Props } from "../utils/const";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import axios from "axios";

const widthScreen = Dimensions.get("window").width;

const MyVideos = ({ id }: { id: number }) => {
  const [videos, setVideos] = useState<any[]>([]);
  const navigation = useNavigation();

  const fetchData = async (id: number) => {
    try {
      const response = await axios.get(`${serverURL}/profilevideos?id=${id}`);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setVideos(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);
  return (
    <FlatList
      data={videos}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.videoItem}
          //   onPress={() =>
          //     navigation.navigate("VideoDetails", {
          //       idPost: item.idPost,
          //       idUser: item.idUser,
          //       avatar: item.avatar,
          //     })
          //   }
        >
          <Image
            style={{ height: "100%", width: "100%", borderRadius: 10 }}
            source={{
              uri: "https://pngmagic.com/product_images/black-background-for-youtube-thumbnail.jpg",
            }}
          />
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
      contentContainerStyle={{
        alignItems: "flex-start",
        marginTop: 10,
        justifyContent: "flex-start",
      }}
    />
  );
};

const ProfileScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontSize: 30,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        ProfileScreen
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  videoItem: {
    width: widthScreen / 3,
    padding: 15,
    height: 180,
    resizeMode: "contain",
  },
});
export default ProfileScreen;
