import {
  Alert,
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const widthScreen = Dimensions.get("window").width;
export default function App({ navigation }) {
  const [result, setResult] = useState([]);
  const [keyword, setKeyword] = useState();

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.head}>
        <View style={styles.input}>
          <TextInput
            style={{ flex: 1 }}
            textContentType="search"
            placeholder="search ..."
            value={keyword}
          />
          <Icon
            name="close"
            color="black"
            size={20}
            onPress={() => setKeyword("")}
          />
        </View>
        <TouchableOpacity style={{ paddingHorizontal: 10 }}>
          <Icon name="navicon" color="black" size={30} />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.head,
          { justifyContent: "space-between", paddingVertical: 10 },
        ]}
      >
        <TouchableOpacity
          style={{ backgroundColor: "#FF1493", padding: 10, borderRadius: 20 }}
        >
          <Text style={{ color: "white", fontSize: 15 }}>Trending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Text style={{ color: "#FF1493", fontSize: 15 }}>Accounts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Text style={{ color: "#FF1493", fontSize: 15 }}>Streaming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Text style={{ color: "#FF1493", fontSize: 15 }}>Audio</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={result}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              width: 200,
              height: 300,
              padding: 10,
              position: "relative",
            }}
            onPress={() => navigation.navigate("VideoDetails", {})}
          >
            <Image
              source={{
                uri: "https://pngmagic.com/product_images/black-background-for-youtube-thumbnail.jpg",
              }}
              style={{
                alignSelf: "center",
                height: "75%",
                width: "100%",
                borderRadius: 15,
              }}
            />
            <Text style={{ paddingVertical: 10, marginLeft: 10 }}>
              {item.content}
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Image
                style={{ height: 30, width: 30, borderRadius: 50 }}
                source={{ uri: item.avatar }}
              />
              <Text style={{ paddingHorizontal: 10 }}>{item.username}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.idPost}
        numColumns={2}
        contentContainerStyle={{
          width: widthScreen,
          paddingHorizontal: 10,
          alignItems: "flex-start",
        }}
      />

      <TouchableOpacity style={{}}>
        <Text style={{ color: "#FF1493" }}>Show more</Text>
        <Icon
          style={{ color: "#FF1493" }}
          name="chevron-down"
          color="black"
          size={20}
        />
      </TouchableOpacity>

      <Text style={{}}>Maybe you're interesting</Text>

      <View style={{}}></View>
    </View>
  );
}
