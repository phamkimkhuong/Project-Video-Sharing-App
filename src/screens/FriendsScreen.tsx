import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import Ionicons from '@expo/vector-icons/Ionicons';

import Followers from '../components/friendsComponents/Followers';
import Following from '../components/friendsComponents/Following';
import { PRIMARY_COLOR } from "../utils/const";

const renderScene = SceneMap({
    first: Followers,
    second: Following,
});

const routes = [
    { key: 'first', title: 'Followers' },
    { key: 'second', title: 'Following' },
];



const FriendsScreen = () => {
    const navigation = useNavigation();
    const [index, setIndex] = React.useState(0);
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Ionicons name="chevron-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Image
                        style={{ width: 40, height: 40, borderRadius: 50, marginHorizontal: 16 }}
                        source={require('../assets/example-user.jpg')}
                    />
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>Ruth Sanders</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginRight: 8 }}>
                        <Ionicons name="search" size={24} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="filter" size={24} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1, width: screenWidth - 40 }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: screenWidth - 40 }}
                    renderTabBar={(props) => (
                        <TabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: PRIMARY_COLOR }}
                            style={{ backgroundColor: 'transparent', elevation: 0 }}
                            pressColor="transparent" 
                            pressOpacity={1}
                        />
                    )}
                    commonOptions={{
                        label: ({ route, labelText, focused, color }) => (
                            <Text style={{ color: focused ? PRIMARY_COLOR : '#333', fontWeight: '600' }}>{labelText}</Text>
                        ),
                    }}
                />
            </View>
        </View>
    );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: screenWidth - 40,
        marginTop: 44,
        marginBottom: 16,
    },
});
export default FriendsScreen;