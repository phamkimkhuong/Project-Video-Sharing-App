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
import { serverURL, Props } from "../utils/const";
import React from "react";

const Login: React.FC<Props> = ({ navigation, route }: Props) => {
  interface Account {
    account_user: string;
    pass: string;
  }

  const [data, setData] = useState<Account[]>([]);
  const [current_user, setCurrent_user] = useState([]);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${serverURL}/account`);
      setData(response.data);
      setUser("");
      setPass("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogin = () => {
    const checkAccount = data.find(
      (item) => item.account_user === user && item.pass === pass
    );
    if (checkAccount) {
      // Alert.alert("Đăng nhập thành công!");
      navigation.navigate("Main", { userData: checkAccount });
    } else {
      Alert.alert("Kiểm tra lại tài khoản và mật khẩu!");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/login/bgL.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.logo}>
          <Text style={{ color: "yellow", fontSize: 32, fontWeight: "bold" }}>
            Welcome Back!
          </Text>
        </View>
        <View style={styles.viewInput}>
          <View style={styles.input}>
            <Icon name="user" size={30} color={"yellow"} />
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              placeholderTextColor={"yellow"}
              value={user}
              onChangeText={setUser}
            />
          </View>
          <View style={styles.input}>
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

          <TouchableOpacity style={styles.Touch} onPress={handleLogin}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
              Login
            </Text>
          </TouchableOpacity>

          <View style={styles.hr} />

          {/* Uncomment the following if you need a Register option */}

          <TouchableOpacity
            style={{ alignSelf: "flex-end", flexDirection: "row" }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ fontSize: 20, color: "white" }}>Register</Text>
            <AntDesign
              name="arrowright"
              size={22}
              color="white"
              style={{ alignSelf: "center", paddingHorizontal: 12 }}
            />
          </TouchableOpacity>
        </View>
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
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
  },
  logo: {
    padding: 20,
  },
  viewInput: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  input: {
    borderColor: "yellow",
    borderWidth: 0.3,
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    marginVertical: 10,
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
  },
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: "pink",
    marginVertical: 20,
  },
});
export default Login;
