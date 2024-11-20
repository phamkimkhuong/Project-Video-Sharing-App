import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { data_audio, PRIMARY_COLOR } from '../../utils/const';
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView } from "@gorhom/bottom-sheet";

import Feather from '@expo/vector-icons/Feather';

import { ImageSourcePropType } from 'react-native';

interface ItemAudioProps {
    img: ImageSourcePropType;
    name: string;
    duration: string;
}

const ItemAudio: React.FC<ItemAudioProps> = ({ img, name, duration }) => {

    const [isPlaying, setIsPlaying] = React.useState(false);

    return (
        <TouchableOpacity style={styles.itemContainer}>
            <View style={styles.itemImg}>
                <Image style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 10, }} source={img} />
            </View>
            <View style={styles.info}>
                <Text style={{ fontSize: 14, color: '#666', fontFamily: '700' }}>{name}</Text>
                <Text style={{ fontSize: 12, color: '#666' }}>{duration}</Text>
            </View>
            <View style={styles.action}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        marginRight: 8,
                        borderWidth: 1,
                        borderColor: PRIMARY_COLOR,
                        borderRadius: 4,
                    }}
                >
                    <Text style={{ fontSize: 12, color: PRIMARY_COLOR }}>Use</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{}} >
                    <Feather name="more-horizontal" size={26} color="black" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const ListAudio = () => {
    return (
        <BottomSheetScrollView>
            <BottomSheetFlatList
                data={data_audio}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <ItemAudio
                        img={item.img}
                        name={item.name}
                        duration={item.duration}
                    />
                )}
            />
        </BottomSheetScrollView>
    )
}

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: screenWidth - 32,
        padding: 4,
        borderRadius: 10,
        marginBottom: 8,
    },
    itemImg: {

    },
    info: {
        flex: 1,
        marginLeft: 8,
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default ListAudio;
