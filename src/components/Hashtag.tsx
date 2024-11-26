import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView, TextInput, } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

interface HashtagProps {
    title: string;
    color: string;
    backgroundColor: string;
}


const Hashtag: React.FC<HashtagProps> = ({ title, color, backgroundColor }) => {
    return (
        <View
            style={{
                backgroundColor: backgroundColor,
                flexDirection: "row",
                alignSelf: "flex-start",
                alignItems: "center",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 999,
                marginBottom: 4,
            }}
        >
            <Text style={{ color: color, }}>{title}</Text>
            <TouchableOpacity>
                <Ionicons name="close-sharp" size={26} color={color} />
            </TouchableOpacity>
        </View>
    )
}

export default Hashtag;