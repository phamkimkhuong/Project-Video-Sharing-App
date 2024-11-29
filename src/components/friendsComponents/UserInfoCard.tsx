import React from "react";
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, Dimensions, ScrollView, ImageSourcePropType } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

import { PRIMARY_COLOR } from "../../utils/const";


interface UserInfoCardProps {
    image: ImageSourcePropType;
    name: string;
    isFollow: boolean;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ image, name, isFollow }) => {
    
    const [isFollowing, setIsFollowing] = React.useState(isFollow); 

    return (
        <Pressable style={styles.container}>
            <Image
                style={{ width: 40, height: 40, borderRadius: 50, marginHorizontal: 12 }}
                source={image}
            />
            <Text style={{ flex: 1, fontSize: 16, fontWeight: 600, color: '#555' }}>{name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => setIsFollowing(!isFollowing)}
                    style={[{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        backgroundColor: PRIMARY_COLOR,
                        borderRadius: 6,
                        marginRight: 4
                    }, isFollowing ? { backgroundColor: 'transparent', borderWidth: 1, borderColor: PRIMARY_COLOR } : '']}
                >
                    <Text style={[{ fontWeight: 600, color: '#eeeeee' }, isFollowing ? { color: PRIMARY_COLOR } : '']} >{isFollowing ? 'Following' : 'Follow'}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    {isFollowing ? <Feather name="more-vertical" size={24} color="#555" /> : <Ionicons name="close" size={24} color="#555" />}
                </TouchableOpacity>
            </View>
        </Pressable>
    )
}

const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 14,
    },
})

export default UserInfoCard;