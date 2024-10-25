import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const ProfileScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{
                fontSize: 30,
                paddingHorizontal: 20,
                paddingVertical: 20,
            }}
            >ProfileScreen</Text>
        </View>
    );
};
const styles = StyleSheet.create({

});
export default ProfileScreen;