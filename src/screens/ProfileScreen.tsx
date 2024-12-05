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
import { serverURL, Props, dataVideos } from "../utils/const";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import axios from "axios";

const widthScreen = Dimensions.get("window").width;

const MyVideos = ({ id }: { id: number }) => {
  const [videos, setVideos] = useState<any[]>([]);

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
          // onPress={() =>
          //   navigation.navigate("VideoDetails", {
          //     idPost: item.idPost,
          //     idUser: item.idUser,
          //     avatar: item.avatar,
          //   })
          // }
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
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Profile: { userData: any };
  Following: { user: any };
  ImageView: { imageUrl: string };
};
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;
const MyImages = ({ id }: { id: number }) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [images, setImages] = useState<{ url: string }[]>([]);
  const fetchData = async (id: number) => {
    try {
      const response = await axios.get(`${serverURL}/profileimages?id=${id}`);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setImages(response.data);
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
      data={images}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.videoItem}
          onPress={() =>
            navigation.navigate("Image", { imageUrl: item.url, id: id })
          }
        >
          <Image
            style={{ height: "100%", width: "100%", borderRadius: 10 }}
            source={{ uri: item.url }}
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
const MyLiked = () => {
  return (
    <FlatList
      data={dataVideos}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.videoItem}>
          <Image source={item.image} />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
      numColumns={3}
      contentContainerStyle={{ alignItems: "center", marginTop: 10 }}
    />
  );
};

const MyVideosTabView = ({ id }: { id: number }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "videos", title: "My Videos" },
    { key: "images", title: "My Images" },
    { key: "liked", title: "Liked" },
  ]);

  const renderScene = SceneMap({
    videos: () => <MyVideos id={id} />,
    images: () => <MyImages id={id} />,
    liked: MyLiked,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      renderLabel={({
        route,
        focused,
      }: {
        route: { key: string; title: string };
        focused: boolean;
      }) => (
        <Text
          style={[
            styles.tabLabel,
            focused ? styles.activeTabLabel : styles.inactiveTabLabel,
          ]}
        >
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: widthScreen }}
    />
  );
};

const ProfileScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const user = route.params ? route.params.userData : null;
  const [user1, setUser] = useState<any[]>([]);
  const [data, setData] = useState<{
    following_count?: number;
    followers_count?: number;
  }>({});
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
  const fetchData = async (id: number) => {
    try {
      const response = await axios.get(`${serverURL}/follow?id=${id}`);
      if (Array.isArray(response.data) && response.data.length > 0) {
        const followData = response.data[0];
        setData(followData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDataUser();
    if (user && user.idUser) {
      fetchData(user.idUser);
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <View style={styles.imgLogo}>
        <Image
          style={{ height: 150, width: 150, borderRadius: 150 }}
          source={{ uri: user.avatar }}
        />
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          {user.username}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <TouchableOpacity
            style={styles.fl}
            onPress={() => navigation.navigate("Following", { user: user })}
          >
            <Text>{data.following_count || 0}</Text>
            <Text style={styles.textgrey}>Following</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fl}
            onPress={() => navigation.navigate("Following", { user: user })}
          >
            <Text>{data.followers_count || 0}</Text>
            <Text style={styles.textgrey}>Followers</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.fl}>
            <Text>6031</Text>
            <Text style={styles.textgrey}>Like</Text>
          </TouchableOpacity>
        </View>
      </View>
      <MyVideosTabView id={user.idUser} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imgLogo: {
    alignItems: "center",
    marginTop: 30,
    paddingBottom: 20,
  },
  fl: {
    paddingHorizontal: 15,
    alignItems: "center",
  },
  textgrey: {
    color: "grey",
  },
  videoItem: {
    width: widthScreen / 3,
    padding: 15,
    height: 180,
    resizeMode: "contain",
  },
  indicator: {
    backgroundColor: "pink",
    height: 2,
  },
  tabBar: {
    backgroundColor: "#D5E2E8",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 2,
    borderBottomColor: "#e0e0e0",
  },
  tabLabel: {
    fontSize: 16,
  },
  activeTabLabel: {
    color: "pink",
  },
  inactiveTabLabel: {
    color: "black",
  },
});
export default ProfileScreen;
