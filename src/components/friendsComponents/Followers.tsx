import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import UserInfoCard from './UserInfoCard';

const Followers = () => {
    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <UserInfoCard image={require('../../assets/example-user.jpg')} name={'Aurora Bennett'} isFollow={true} />
            <UserInfoCard image={require('../../assets/example-user.jpg')} name={'Sophia Carter'} isFollow={false} />
        </ScrollView>
    )
}
export default Followers;