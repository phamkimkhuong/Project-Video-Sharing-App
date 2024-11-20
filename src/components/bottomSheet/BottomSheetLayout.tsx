import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetView, useBottomSheet } from "@gorhom/bottom-sheet";

import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

import { PRIMARY_COLOR } from '../../utils/const';
import ListAudio from './ListAudio';
import ListFilter from './ListFilter';


interface BottomSheetLayoutProps {
    handleClosePress: () => void;
    title: string;
}

const BottomSheetLayout: React.FC<BottomSheetLayoutProps> = ({ handleClosePress, title }) => {

    const [focusedButton, setFocusedButton] = useState('For you');

    const handlePress = (button: string) => {
        setFocusedButton(button);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 22, fontWeight: '600', color: '#666' }}>{title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity style={{}}>
                        <AntDesign name="search1" size={20} color="#666" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 8, }} onPress={handleClosePress}>
                        <AntDesign name="close" size={24} color="#666" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.category}>
                {title === 'Add filter' &&
                    (<TouchableOpacity style={{ paddingVertical: 8 }}>
                        <Ionicons name="ban-outline" size={24} color={PRIMARY_COLOR} />
                    </TouchableOpacity>)
                }
                <TouchableOpacity
                    style={[styles.btnCate, { backgroundColor: focusedButton === 'For you' ? PRIMARY_COLOR : 'white' }]}
                    onPress={() => handlePress('For you')}
                >
                    <Text style={[{ color: PRIMARY_COLOR }, { color: focusedButton === 'For you' ? 'white' : PRIMARY_COLOR }]}>For you</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btnCate, { backgroundColor: focusedButton === 'Trending' ? PRIMARY_COLOR : 'white' }]}
                    onPress={() => handlePress('Trending')}
                >
                    <Text style={[{ color: PRIMARY_COLOR }, { color: focusedButton === 'Trending' ? 'white' : PRIMARY_COLOR }]}>Trending</Text>
                </TouchableOpacity>
                <View
                    style={{
                        width: 1,
                        height: 40,
                        backgroundColor: '#fef0f5',

                    }}
                ></View>
                <TouchableOpacity
                    style={[styles.btnCate, { backgroundColor: focusedButton === 'Saved' ? PRIMARY_COLOR : 'white' }]}
                    onPress={() => handlePress('Saved')}
                >
                    <Text style={[{ color: PRIMARY_COLOR }, { color: focusedButton === 'Saved' ? 'white' : PRIMARY_COLOR }]}>Saved</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                {title === 'Add filter' ? <ListFilter /> : <ListAudio />}
            </View>
        </View>
    )
}

const screenWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: screenWidth,
        paddingHorizontal: 16,
    },
    category: {
        marginVertical: 8,
        width: screenWidth,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnCate: {
        paddingHorizontal: 20,
        paddingVertical: 4,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 999,
        alignItems: 'center',
    },
    content: {
        flex: 1,
        width: screenWidth,
        paddingHorizontal: 16,
    }
})

export default BottomSheetLayout;