import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { data_filter, PRIMARY_COLOR } from '../../utils/const';
import { BottomSheetFlatList, BottomSheetScrollView } from '@gorhom/bottom-sheet';

interface ItemFilterProps {
    name: string;
    img: any;
    index: number;
}

const ItemFilter: React.FC<ItemFilterProps> = ({ name, img, index }) => {

    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
    const flatListRef = useRef<FlatList<any>>(null);

    const handleFocusItem = (index: number) => {
        setFocusedIndex(index);
        flatListRef.current?.scrollToIndex({
            index
        });
    };

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleFocusItem(index)}>
            <View>
                <Image
                    style={[{ width: 40, height: 40, objectFit: 'cover', borderRadius: 10, },
                    focusedIndex === index ? {} : {}
                    ]}
                    source={img}
                />
            </View>
            <Text style={{ fontSize: 10, color: '#666', textAlign: 'center' }}>{name}</Text>
        </TouchableOpacity>
    )
}

const ListFilter = () => {
    return (
        <BottomSheetScrollView>
            <BottomSheetFlatList
                numColumns={4}
                data={data_filter}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <ItemFilter
                        index={parseInt(item.id, 10)}
                        name={item.name}
                        img={item.img}
                    />
                )}
            />
        </BottomSheetScrollView>
    )
}

const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    listContainer: {
    },
    itemContainer: {
        width: (screenWidth - 32) / 4,
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 8,
    },
})

export default ListFilter;