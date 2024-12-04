import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/EvilIcons";
import { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import { serverURL, Props } from "../utils/const";
import e from "express";
import React from "react";

const RegisterScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${serverURL}/account`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState("");

  const regis = () => {
    console.log("accname " + user);
    console.log("pass " + pass);
    console.log("User name " + name);
    console.log("sdt " + sdt);
    console.log("email " + email);
  };
  const InsertUser = async () => {
    // regis();
    try {
      const response = await axios.post(`${serverURL}/register`, {
        username: name,
        sdt,
        email,
        accname: user,
        pass,
      });
      if (response.status === 201) {
        Alert.alert("Thành công", "Tạo tài khoản thành công");
        navigation.navigate("Login");
      } else {
        Alert.alert("Lỗi", "Đã xảy ra lỗi khi tạo tài khoản");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      Alert.alert("Lỗi", "Không thể kết nối tới máy chủ.");
    }
  };
  return (
    <ImageBackground
      source={require("../assets/bgL.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.logo}>
          <Text style={{ color: "yellow", fontSize: 32, fontWeight: "bold" }}>
            Video Sharing App!
          </Text>
        </View>
        <View style={styles.viewInput}>
          <View style={[{ width: "50%" }, styles.input]}>
            <Icon name="user" size={30} color={"yellow"} />
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              placeholderTextColor={"yellow"}
              value={user}
              onChangeText={setUser}
            />
          </View>
          <View style={[{ width: "48%" }, styles.input]}>
            <Icon name="lock" size={30} color={"yellow"} />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor={"yellow"}
              value={pass}
              onChangeText={setPass}
            />
          </View>
        </View>
        <View style={styles.viewInput}>
          <View style={[{ width: "100%" }, styles.input]}>
            <AntDesign name="user" size={20} color="yellow" />
            <TextInput
              style={styles.textInput}
              placeholder="Your name"
              placeholderTextColor={"yellow"}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={styles.viewInput}>
          <View style={[{ width: "100%" }, styles.input]}>
            <Fontisto name="email" size={24} color="yellow" />
            <TextInput
              style={styles.textInput}
              placeholder="Your email"
              placeholderTextColor={"yellow"}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Your email"
              placeholderTextColor={"yellow"}
              value="@gmail.com"
              editable={false}
            />
          </View>
        </View>

        <View style={styles.viewInput}>
          <View style={[{ width: "100%" }, styles.input]}>
            <AntDesign name="phone" size={20} color="yellow" />
            <TextInput
              style={styles.textInput}
              placeholder="Your Phone"
              placeholderTextColor={"yellow"}
              value={sdt}
              onChangeText={setSdt}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.Touch} onPress={InsertUser}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
            Register
          </Text>
        </TouchableOpacity>

        <View style={styles.hr} />

        <TouchableOpacity
          style={{
            alignItems: "flex-start",
            flexDirection: "row",
            paddingHorizontal: 20,
            width: "100%",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <AntDesign
            name="arrowleft"
            size={20}
            color="white"
            style={{ alignSelf: "center", paddingHorizontal: 10 }}
          />
          <Text style={{ fontSize: 22, color: "white" }}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
  },
  logo: {
    padding: 20,
  },
  viewInput: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderColor: "yellow",
    borderWidth: 0.3,
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    color: "yellow",
  },
  textInput: {
    marginLeft: 10,
    flex: 1,
    paddingHorizontal: 10,
    color: "yellow",
  },
  Touch: {
    padding: 20,
    backgroundColor: "pink",
    alignItems: "center",
    marginTop: 30,
    borderRadius: 15,
    width: "100%",
    marginHorizontal: 20,
  },
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: "yellow",
    marginVertical: 20,
  },
});
export default RegisterScreen;
