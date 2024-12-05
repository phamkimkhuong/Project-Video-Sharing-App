import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import UserInfoCard from './UserInfoCard';

const Following = () => {
    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <UserInfoCard image={require('../../assets/example-user.jpg')} name={'Isabella Hayes'} isFollow={true} />
            <UserInfoCard image={require('../../assets/example-user.jpg')} name={'Luna Parker'} isFollow={true} />
            <UserInfoCard image={require('../../assets/example-user.jpg')} name={'Amelia Brooks'} isFollow={true} />
            <UserInfoCard image={require('../../assets/example-user.jpg')} name={'Ethan Maxwell'} isFollow={true} />

            <Text style={{ fontSize: 16, fontWeight: 600, color: '#555', marginTop: 16 }}>Suggestion for you</Text>
            <UserInfoCard image={require('../../assets/example-user.jpg')} name={'Oliver Scott'} isFollow={false} />
            <UserInfoCard image={require('../../assets/example-user.jpg')} name={'Lucas Miller'} isFollow={false} />
            <UserInfoCard image={require('../../assets/example-user.jpg')} name={'Mason Reed'} isFollow={false} />
        </ScrollView>
    )
}
export default Following;