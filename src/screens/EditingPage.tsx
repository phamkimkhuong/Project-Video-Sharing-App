import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';


const EditingPage = () => {
    return (
        <View style={styles.container}>
            <Text>Editing Page</Text>
        </View>
    )
}

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

})

export default EditingPage;