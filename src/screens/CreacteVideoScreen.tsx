import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const CreacteVideoScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.text}>CreacteVideoScreen</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        paddingHorizontal: 20,
        paddingVertical: 20,
    }
});
export default CreacteVideoScreen;