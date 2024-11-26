import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Camera, CameraView } from "expo-camera";
import { CameraType } from "expo-camera";
import { Video, ResizeMode } from "expo-av";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

//icon
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

// customs
import BottomSheetLayout from "../components/bottomSheet/BottomSheetLayout";

const CreateVideoScreen = () => {
  const navigation = useNavigation();

  const [titleButtonSheet, setTitleButtonSheet] = useState("Add audio");

  const handlePressAddAudio = () => {
    setTitleButtonSheet("Add audio");
    handleExpandPress();
  };

  const handlePressAddFilter = () => {
    setTitleButtonSheet("Add filter");
    handleExpandPress();
  };

  // bottom sheet
  const sheetRef = useRef<BottomSheet>(null);
  // callback
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleExpandPress = useCallback(() => {
    sheetRef.current?.expand();
  }, []);

  // camera
  let cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("front");
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | undefined
  >(undefined);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState<
    boolean | undefined
  >(undefined);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<
    boolean | undefined
  >(undefined);
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<{ uri: string } | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (
    hasCameraPermission === undefined ||
    hasMicrophonePermission === undefined
  ) {
    return <Text>Requestion permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted.</Text>;
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  let recordVideo = () => {
    setIsRecording(true);
    let options = {
      quality: "1080p",
      maxDuration: 60,
      mute: false,
    };

    cameraRef.current?.recordAsync(options).then((recordedVideo) => {
      if (recordedVideo) {
        setVideo(recordedVideo);
      }
      setIsRecording(false);
    });
  };

  let stopRecording = () => {
    setIsRecording(false);
    cameraRef.current?.stopRecording();
  };

  if (video) {
    let shareVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    let saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Video
          style={styles.video}
          source={{ uri: video.uri }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
        <Button title="Share" onPress={shareVideo} />
        {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={saveVideo} />
        ) : undefined}
        <Button title="Discard" onPress={() => setVideo(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <CameraView style={styles.container} ref={cameraRef} facing={facing}>
          <View style={styles.actionContainer}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  navigation.goBack();
                  handleClosePress();
                }}
              >
                <Ionicons name="close-sharp" size={36} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePressAddAudio}
                style={{
                  backgroundColor: "white",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 999,
                  marginLeft: "25%",
                }}
              >
                <Entypo name="note" size={20} color="black" />
                <Text style={{ fontWeight: "bold", color: "#555" }}>
                  Add audio
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20, alignItems: "flex-end" }}>
              <View style={{ gap: 20 }}>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={toggleCameraFacing}
                >
                  <Feather name="refresh-ccw" size={20} color="white" />
                  <Text style={{ color: "white", fontSize: 12 }}>Flip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={handlePressAddFilter}
                >
                  <Entypo name="sound-mix" size={20} color="white" />
                  <Text style={{ color: "white", fontSize: 12 }}>Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="timer-outline"
                    size={20}
                    color="white"
                  />
                  <Text style={{ color: "white", fontSize: 12 }}>Timer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "center" }}>
                  <Ionicons name="flash-outline" size={20} color="white" />
                  <Text style={{ color: "white", fontSize: 12 }}>Flash</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity style={{ alignItems: "center" }}>
                  <Feather name="smile" size={30} color="white" />
                  <Text style={{ color: "white", fontSize: 12, marginTop: 4 }}>
                    Effect
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={isRecording ? stopRecording : recordVideo}
                >
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 999,
                      backgroundColor: "#de3b40",
                      marginBottom: 20,
                      borderWidth: 4,
                      borderColor: "#e7686d",
                    }}
                  ></View>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "center" }}>
                  <AntDesign name="picture" size={30} color="white" />
                  <Text style={{ color: "white", fontSize: 12, marginTop: 4 }}>
                    Upload
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </CameraView>
      </View>

      <BottomSheet
        ref={sheetRef}
        snapPoints={["50%"]}
        index={-1}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={styles.contentContainer}>
          <BottomSheetLayout
            title={titleButtonSheet}
            handleClosePress={handleClosePress}
          />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const screenWidth = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    width: screenWidth,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default CreateVideoScreen;

{
  /* <View style={styles.actionContainer}>
    <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
            <Ionicons name="close-sharp" size={36} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 999,
                marginLeft: '25%'
            }}
        >
            <Entypo name="note" size={20} color="black" />
            <Text style={{ fontWeight: 'bold', color: '#555', }}>Add audio</Text>
        </TouchableOpacity>
    </View>

    <View style={{ marginTop: 20, alignItems: 'flex-end', }}>
        <View style={{ gap: 20 }}>
            <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={toggleCameraType}
            >
                <Feather name="refresh-ccw" size={20} color="white" />
                <Text style={{ color: 'white', fontSize: 12 }}>Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }}>
                <Entypo name="sound-mix" size={20} color="white" />
                <Text style={{ color: 'white', fontSize: 12 }}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }}>
                <MaterialCommunityIcons name="timer-outline" size={20} color="white" />
                <Text style={{ color: 'white', fontSize: 12 }}>Timer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }}>
                <Ionicons name="flash-outline" size={20} color="white" />
                <Text style={{ color: 'white', fontSize: 12 }}>Flash</Text>
            </TouchableOpacity>
        </View>
    </View>

    <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <TouchableOpacity style={{ alignItems: 'center' }}>
                <Feather name="smile" size={30} color="white" />
                <Text style={{ color: 'white', fontSize: 12, marginTop: 4 }}>Flash</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }}>
                <View style={{
                    width: 60,
                    height: 60,
                    borderRadius: 999,
                    backgroundColor: '#de3b40',
                    marginBottom: 20,
                    borderWidth: 4,
                    borderColor: '#e7686d',
                }}></View>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }}>
                <AntDesign name="picture" size={30} color="white" />
                <Text style={{ color: 'white', fontSize: 12, marginTop: 4 }}>Upload</Text>
            </TouchableOpacity>
        </View>
    </View>
</View> */
}
