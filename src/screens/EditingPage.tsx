import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView, TextInput, Switch } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { PRIMARY_COLOR } from '../utils/const';
import Hashtag from '../components/Hashtag';
import { SelectList } from 'react-native-dropdown-select-list'
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



const EditingPage = () => {
    const navigation = useNavigation();

    // toggle comment
    const [isComment, setIsComment] = useState(false);
    const toggleSwitch = () => setIsComment(previousState => !previousState);

    const [isPostFacebook, setIsPostFacebook] = useState(false);
    const [isPostTwitter, setIsPostTwitter] = useState(false);
    const [isPostInstagram, setIsPostInstagram] = useState(false);


    //select list 
    const [selected, setSelected] = React.useState("");

    const data = [
        { key: '1', value: 'John Doe' },
        { key: '2', value: 'Jane Smith' },
        { key: '3', value: 'Alice Johnson' },
        { key: '4', value: 'Robert Brown' },
        { key: '5', value: 'Emily Davis' },
        { key: '6', value: 'Michael Wilson' },
        { key: '7', value: 'Sarah Miller' },
    ]


    const route = useRoute();
    // @ts-ignorecomment 
    const { result } = route.params;

    const [image, setImage] = React.useState<string | null>(null);

    useEffect(() => {
        setImage(result);
    }, [result]);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <View style={{ width: screenWidth / 1.5, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: 30, marginRight: 10 }} onPress={navigation.goBack}>
                        <Ionicons name="chevron-back" size={30} color="black" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>Post on social</Text>
                </View>
                <TouchableOpacity>
                    <Text style={{ color: PRIMARY_COLOR }} >Review</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ width: screenWidth, alignItems: 'center' }}>
                    <View style={styles.containerImg} >
                        {image && <Image source={{ uri: image }} style={styles.image} />}
                    </View>
                    <TouchableOpacity>
                        <Text style={{ color: PRIMARY_COLOR, fontSize: 16 }} >Change cover photo</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 30, }}>
                    <View style={{ paddingHorizontal: 20, }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 4, color: '#444' }}>Title</Text>
                        <TextInput placeholder='Input title' style={{ backgroundColor: '#e4e4e4', borderRadius: 10, paddingHorizontal: 10 }} />
                    </View>
                </View>
                <View style={{ marginTop: 30, }}>
                    <View style={{ paddingHorizontal: 20, }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 4, color: '#444' }}>Decription</Text>
                        <TextInput
                            placeholder='Input title'
                            multiline={true}
                            numberOfLines={4}
                            style={{ backgroundColor: '#e4e4e4', borderRadius: 10, paddingHorizontal: 10, height: 100, textAlignVertical: 'top' }}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 30, }}>
                    <View style={{ paddingHorizontal: 20, }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 4, color: '#444' }}>Add hashtag</Text>
                        <View style={{}}>
                            <Hashtag title='Happy momments' color="#3b7dd8" backgroundColor='#deebfb' />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 30, }}>
                    <View style={{ paddingHorizontal: 20, }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 4, color: '#444' }}>Tag someone</Text>
                        <View style={{}}>
                            <Hashtag title='#giavix' color={PRIMARY_COLOR} backgroundColor='#ffdbe7' />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 30, }}>
                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 4, color: '#444', width: screenWidth / 2 - 20 }}>Comments</Text>
                        <View style={{ width: screenWidth / 2 - 20 }}>
                            <Switch
                                trackColor={{ false: '#767577', true: '#ffdbe7' }}
                                thumbColor={isComment ? PRIMARY_COLOR : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => setIsComment(previousState => !previousState)}
                                value={isComment}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 30, }}>
                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 4, color: '#444', width: screenWidth / 2 - 20 }}>Who can watch</Text>
                        <View style={{ width: screenWidth / 2 - 20 }}>
                            <SelectList
                                setSelected={(val: string) => setSelected(val)}
                                data={data}
                                save="value"
                            />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 30, }}>
                    <View style={{ paddingHorizontal: 20, }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 4, color: '#444', }}>Also post on</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10, }}>
                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: screenWidth / 2 - 20 }}>
                            <Ionicons name="logo-facebook" size={30} color="#197dc8" />
                            <Text style={{ fontSize: 16, color: '#666', lineHeight: 30, marginLeft: 8 }}>Facebook</Text>
                        </View>
                        <View style={{ width: screenWidth / 2 - 20 }}>
                            <Switch
                                trackColor={{ false: '#767577', true: '#ffdbe7' }}
                                thumbColor={isPostFacebook ? PRIMARY_COLOR : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => setIsPostFacebook(previousState => !previousState)}
                                value={isPostFacebook}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10, }}>
                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: screenWidth / 2 - 20 }}>
                            <Ionicons name="logo-twitter" size={30} color="#3899e5" />
                            <Text style={{ fontSize: 16, color: '#666', lineHeight: 30, marginLeft: 8 }}>Twitter</Text>
                        </View>
                        <View style={{ width: screenWidth / 2 - 20 }}>
                            <Switch
                                trackColor={{ false: '#767577', true: '#ffdbe7' }}
                                thumbColor={isPostTwitter ? PRIMARY_COLOR : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => setIsPostTwitter(previousState => !previousState)}
                                value={isPostTwitter}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10, }}>
                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: screenWidth / 2 - 20 }}>
                            <Ionicons name="logo-instagram" size={30} color={PRIMARY_COLOR} />
                            <Text style={{ fontSize: 16, color: '#666', lineHeight: 30, marginLeft: 8 }}>Instagram</Text>
                        </View>
                        <View style={{ width: screenWidth / 2 - 20 }}>
                            <Switch
                                trackColor={{ false: '#767577', true: '#ffdbe7' }}
                                thumbColor={isPostInstagram ? PRIMARY_COLOR : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => setIsPostInstagram(previousState => !previousState)}
                                value={isPostInstagram}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ marginVertical: 40, }}>
                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{
                                width: screenWidth / 2 - 25,
                                height: 50,
                                backgroundColor: 'transparent',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor: PRIMARY_COLOR,
                                flexDirection: 'row',
                            }}
                        >
                            <Octicons name="download" size={24} color={PRIMARY_COLOR} />
                            <Text style={{ color: PRIMARY_COLOR, fontSize: 16, fontWeight: '600', marginLeft: 6 }}>Save draft</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: screenWidth / 2 - 25,
                                height: 50,
                                backgroundColor: PRIMARY_COLOR,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                flexDirection: 'row',
                            }}
                        >
                            <FontAwesome5 name="telegram-plane" size={24} color="white" />
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600', marginLeft: 6 }}>Post on social</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    header: {
        marginTop: 40,
        paddingHorizontal: 20,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: screenWidth,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        position: 'static', top: 0, left: 0, right: 0,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 2000,
    },
    containerImg: {
        marginVertical: 20,
        width: screenWidth * 0.5,
        height: screenWidth * 0.7,
        overflow: 'hidden',
        backgroundColor: 'beige',

    },
    image: {
        width: screenWidth * 0.5,
        height: screenWidth * 0.7,
        borderRadius: 15,
    },
})

export default EditingPage;