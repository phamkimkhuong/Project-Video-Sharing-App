import { Alert, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import Icon2 from "react-native-vector-icons/FontAwesome";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import { serverURL, Props, dataGoiY, dataFollowing } from "../utils/const";
const MyVideos = ({ idUser, my }: { idUser: number; my: any }) => {
  const navigation = useNavigation();
  const [followed, setFollowed] = useState<any[]>([]);

  const click = ({ user }: { user: any }) => {
    navigation.navigate("ProfileDetails", { user: user, my: my });
    // Alert.alert("Thông báo", "Chức năng đang phát triển");
  };
  const fetchData = async (idUser: number) => {
    try {
      const response = await axios.get(`${serverURL}/followed?id=${idUser}`);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setFollowed(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    if (idUser) {
      fetchData(idUser);
    }
  }, [idUser]);
  return (
    <FlatList
      data={followed}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.cardPeople}
          onPress={() => click({ user: item })}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: item.avatar }}
              style={{ height: 50, width: 50, borderRadius: 50 }}
            />
            <Text style={{ marginLeft: 20, fontSize: 20 }}>
              {item.username}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 0.3,
              borderColor: "black",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text>Following</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        width: "100%",
        paddingHorizontal: 10,
        marginTop: 30,
        flex: 1,
      }}
    />
  );
};

const MyImages = ({ idUser, my }: { idUser: number; my: any }) => {
  const navigation = useNavigation();
  const [followed, setFollowed] = useState<any[]>([]);
  const click = ({ user }: { user: any }) => {
    navigation.navigate("ProfileDetails", { user: user, my: my });
    Alert.alert("Thông báo", "Chức năng đang");
  };
  const fetchData = async (idUser: number) => {
    try {
      const response = await axios.get(`${serverURL}/following?id=${idUser}`);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setFollowed(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    if (idUser) {
      fetchData(idUser);
    }
  }, [idUser]);
  return (
    <FlatList
      data={followed}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.cardPeople}
          onPress={() => click({ user: item })}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: item.avatar }}
              style={{ height: 50, width: 50, borderRadius: 50 }}
            />
            <Text style={{ marginLeft: 20, fontSize: 20 }}>
              {item.username}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 0.3,
              borderColor: "black",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text>Following</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        width: "100%",
        paddingHorizontal: 10,
        marginTop: 30,
        flex: 1,
      }}
    />
  );
};

const widthScreen = Dimensions.get("window").width;

import { NavigationProp } from "@react-navigation/native";

const MyVideosTabView = ({
  user,
  navigation,
  my,
}: {
  user: any;
  navigation: NavigationProp<any>;
  my: any;
}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "videos", title: "Follower" },
    { key: "images", title: "Đã Follow" },
  ]);

  const renderScene = SceneMap({
    videos: () => <MyVideos idUser={user.idUser} my={my} />,
    images: () => <MyImages idUser={user.idUser} my={my} />,
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
        route: { title: string };
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

const Following: React.FC<Props> = ({ navigation, route }: Props) => {
  const user = route?.params?.user ?? {};
  const my = user;
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View style={styles.leftHead}>
          <Icon2
            name="angle-left"
            size={30}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Image
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
              marginHorizontal: 10,
            }}
            source={{ uri: user.avatar }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {user.username}
          </Text>
        </View>
        <View style={styles.leftHead}>
          <TouchableOpacity>
            <Icon2
              style={{ paddingHorizontal: 5 }}
              name="search"
              size={20}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon2
              style={{ paddingHorizontal: 5 }}
              name="bars"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <MyVideosTabView user={user} my={my} navigation={navigation} />
      <View style={{ marginBottom: 20, height: 300 }}>
        <Text style={{ backgroundColor: "#E8E8E8", padding: 10 }}>
          Suggestion for you
        </Text>
        <FlatList
          data={dataGoiY}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.cardPeople}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={item.image} style={{ height: 50, width: 50 }} />
                <Text style={{ marginLeft: 10 }}>{item.name}</Text>
              </View>
              <View
                style={{
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: "#00BFFF",
                }}
              >
                <Text style={{ color: "white" }}>Follow</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            width: "100%",
            paddingHorizontal: 10,
            marginTop: 30,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  head: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftHead: {
    flexDirection: "row",
    alignItems: "center",
  },
  scene: {
    height: 200,
  },
  tabBar: {
    backgroundColor: "#D5E2E8",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  indicator: {
    backgroundColor: "pink",
    height: 2,
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeTabLabel: {
    color: "pink",
  },
  inactiveTabLabel: {
    color: "gray",
  },
  cardPeople: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default Following;
