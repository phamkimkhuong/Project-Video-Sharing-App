import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import axios from "axios";
import Icon2 from "react-native-vector-icons/FontAwesome";
import Icon3 from "react-native-vector-icons/EvilIcons";
import { serverURL, Props } from "../utils/const";
const ImageView: React.FC<Props> = ({ navigation, route }: Props) => {
  const { id } = route.params as {
    id: number;
  };
  const [images, setImages] = useState<any[]>([]);
  const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({});
  const [comments, setComments] = useState<
    {
      idComment: string;
      avatar: string;
      username: string;
      time: string;
      text: string;
    }[]
  >([]);
  const [content, setContent] = useState("");
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${serverURL}/imageStreaming`);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setImages(response.data);
      }
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };

  const fetchComments = async (idPost: number) => {
    try {
      const response = await axios.get(`${serverURL}/comment?id=${idPost}`);
      if (response.status === 200) {
        setComments(response.data);
        // setCommentsVisible(true);
      } else {
        Alert.alert("Lỗi", "Không thể lấy bình luận. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      Alert.alert("Lỗi", "Đã có lỗi xảy ra trong quá trình lấy bình luận.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const postComment = async (
    idPost: number,
    idUser: number,
    content: string
  ) => {
    if (content.trim() === "") {
      Alert.alert("", "Nội dung bình luận không được để trống.");
      return;
    }
    try {
      const response = await axios.post(`${serverURL}/insertComment`, {
        idPost,
        idUser,
        content,
      });
      if (response.status === 201) {
        fetchComments(idPost);
        setContent("");
      } else {
        Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu comment vào cơ sở dữ liệu.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      Alert.alert("Lỗi", "Không thể kết nối tới máy chủ.");
    }
  };
  const themBinhLuan = async (idPost: number) => {
    postComment(idPost, id, content);
  };
  function chay(item: number) {
    setCommentsVisible(true);
    fetchComments(item);
  }
  const toggleLike = (id: number) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderAnh = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={{ padding: 10, flexDirection: "row" }}
        onPress={() =>
          navigation.navigate("ProfileDetails", { user: item, id: id })
        }
      >
        <Image
          style={{ height: 30, width: 30, borderRadius: 30 }}
          source={{ uri: item.avatar }}
        />
        <Text
          style={{ fontWeight: "bold", alignSelf: "center", marginLeft: 10 }}
        >
          {item.username}
        </Text>
      </TouchableOpacity>
      <Image source={{ uri: item.url }} style={styles.image} />
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => toggleLike(item.idPost)}>
          <EvilIcons
            name="heart"
            size={40}
            color={likedPosts[item.idPost] ? "red" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            chay(item.idPost);
          }}
        >
          <EvilIcons name="comment" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <EvilIcons name="share-apple" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10 }}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>{item.username}</Text> :{" "}
          {item.content}
        </Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isCommentsVisible}
        onRequestClose={() => setCommentsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Bình luận</Text>
            <TouchableOpacity>
              <Icon3
                style={styles.close}
                name="close"
                size={30}
                color="black"
                onPress={() => setCommentsVisible(false)}
              />
            </TouchableOpacity>
            <FlatList
              data={comments}
              keyExtractor={(comment) => comment.idComment}
              renderItem={({
                item,
              }: {
                item: {
                  idComment: string;
                  avatar: string;
                  username: string;
                  time: string;
                  text: string;
                };
              }) => (
                <View
                  style={{
                    flexDirection: "row",
                    padding: 5,
                    alignItems: "center",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{ uri: item.avatar }}
                      style={{ height: 50, width: 50, borderRadius: 50 }}
                    />
                    <View style={{ paddingLeft: 10 }}>
                      <Text
                        style={[styles.commentText, { fontWeight: "bold" }]}
                      >
                        {item.username}
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          color: "gray",
                          marginTop: -8,
                          marginBottom: 5,
                        }}
                      >
                        {item.time}
                      </Text>
                      <Text style={styles.commentText}>{item.text}</Text>
                    </View>
                  </View>
                  <Icon2 name="heart-o" size={20} color="gray" />
                </View>
              )}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                style={styles.input}
                placeholder="Thêm bình luận..."
                placeholderTextColor="#888"
                value={content}
                onChangeText={setContent}
              />
              <TouchableOpacity>
                <Icon2
                  name="paper-plane"
                  size={30}
                  color="pink"
                  onPress={() => themBinhLuan(item.idPost)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );

  return images.length > 0 ? (
    <FlatList
      data={images}
      renderItem={renderAnh}
      keyExtractor={(item) => item.idPost}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ marginTop: 10 }}
      showsVerticalScrollIndicator={false}
    />
  ) : (
    <View style={styles.container}>
      <Text>No images available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  card: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    height: "auto",
  },
  image: {
    width: "100%",
    height: 500,
    resizeMode: "contain",
    borderRadius: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "relative",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    height: "60%",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    paddingHorizontal: 8,
    flex: 1,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  close: {
    position: "absolute",
    right: 0,
    top: -40,
  },
});

export default ImageView;
