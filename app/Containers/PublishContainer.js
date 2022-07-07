import React, { useState } from 'react';
import { SafeAreaView, Text, FlatList, Image, View, TouchableOpacity, Animated, Dimensions, Modal, Switch, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Platform } from 'react-native';
import HeaderChapter from '../Components/Utils/HeaderChapter';
import { useUserContext } from '../context/UserContext';
import { colors } from '../utils/colors';
import { sharedStyles } from '../utils/styles';
import ImagePickerExample from '../Components/Utils/imagePicker';
import postApi from '../services/postApi';
import { randomId } from '../utils/sharedFunctions';
import uploadApi from '../services/uploadApi';
import { BASE_URL } from '../config/config';

const dimWidth = Dimensions.get('screen').width

export default function PublishContainer({ navigation }) {

    const userContext = useUserContext();

    const [leftValue, setLeftValue] = useState(new Animated.Value(0))
    const [widthValue, setWidthValue] = useState(new Animated.Value(dimWidth * 0.333))
    const [slideIndex, setSlideIndex] = useState(0)
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [datetime, setDateTime] = useState(new Date())
    const [showDate, setShowDate] = useState(false)
    const [showTime, setShowTime] = useState(false)
    const [image, setImage] = React.useState(null)
    const [title, setTitle] = React.useState("")
    const [seats, setSeats] = React.useState("")
    const [description, setDescription] = React.useState()
    const [address, setAddress] = React.useState()
    const [isSearch, setIsSearch] = React.useState(true)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [category, setCategory] = React.useState(1)
    const [district, setDistrict] = React.useState("")

    React.useEffect(() => {
        if (!userContext.authState.isConnected) {
            navigation.navigate('AuthStack')
        }
    }, [userContext.authState.isConnected, userContext.authState.errorMessage])

    function movableButton(index) {
        if (index !== slideIndex) {
            setSlideIndex(index)

            let width = 0.333
            let left = 0
            setCategory(1)

            if (index === 1) {
                setCategory(2)
                width = 0.333
                left = 0.333
            }
            if (index === 2) {
                setCategory(3)
                width = 0.333
                left = 0.667
            }

            Animated.parallel([
                Animated.timing(leftValue, {
                    toValue: dimWidth * left,
                    duration: 300,
                    useNativeDriver: false
                }),
                Animated.timing(widthValue, {
                    toValue: dimWidth * width,
                    duration: 300,
                    useNativeDriver: false
                })
            ]).start()
        }
    }

    const onChangeTime = (event, selectedDate) => {
        setShowTime(false);
        setTime(selectedDate);
    };

    const onChangeDate = (event, selectedDate) => {
        setShowDate(false);
        setDate(selectedDate);
    };

    const sendPostTapped = async () => {
        setLoading(true)

        if (!userContext.authState.user.id) {
            setError("Une erreur est survenue, veuillez réessayer")
            setLoading(false)
        }

        const data = {
            post: {
                title: title,
                datetime: Platform.OS === 'ios' ? datetime : time,
                seats: seats,
                description: description,
                isSearch: !isSearch,
                address: address,
                district: district,
                user: { id: userContext.authState.user.id },
                category: { id: category }
            },
            picture: Platform.OS === 'ios' ? image?.uri.replace('file://', '') : image?.uri,
        }

        if (data.picture) {
            const formData = new FormData()
            let uri = data.picture
            const imageId = randomId(20)

            formData.append('files', {
                name: `${imageId}.jpg`,
                type: 'image/jpeg',
                uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
            });

            const uploadResponse = await uploadApi.uploadPicture(formData)

            if (uploadResponse[0]?.url) {
                data.post.avatarUrl = BASE_URL + uploadResponse[0].url
            }
        }
        const response = await postApi.publish({ data: data.post })

        if (response.data.error) {
            console.log(response)
        }
        setLoading(false)
    }

    return (
        <View style={{ height: '100%', width: '100%' }}>
            <SafeAreaView style={{ height: '100%', width: '100%', alignItems: 'center', backgroundColor: 'white' }}>
                <View style={{ zIndex: 1, position: 'absolute', width: '100%', backgroundColor: 'white' }}>
                    <HeaderChapter text={'Publier sur Food Food'}></HeaderChapter>
                    <View style={{ flexDirection: "row", width: '100%', height: 50, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.primaryYellow, justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => movableButton(0)} style={{ width: '33.3%', alignItems: 'center' }}><Text>Evénements</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => movableButton(1)} style={{ width: '33.3%', alignItems: 'center' }}><Text>Ateliers</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => movableButton(2)} style={{ width: '33.3%', alignItems: 'center' }}><Text>Bons Plans</Text></TouchableOpacity>
                        <Animated.View style={{ position: 'absolute', bottom: 0, left: leftValue, zIndex: 1, height: 5, width: widthValue, backgroundColor: colors.primaryYellow }}></Animated.View>
                    </View>
                </View>
                <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ paddingTop: 170, paddingBottom: 20, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                        <Text>Je propose</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: colors.primaryYellow }}
                            thumbColor={colors.white}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => setIsSearch(!value)}
                            value={!isSearch}
                            style={{ margin: 10 }}
                        />
                        <Text>Je recherche</Text>
                    </View>
                    <View style={{ width: '90%' }}>
                        <Text style={{ ...sharedStyles.textPublish }}>Titre de l'évenement<Text style={{ color: colors.red }}> *</Text></Text>
                        <TextInput value={title} onChangeText={(text) => setTitle(text)} style={{ ...sharedStyles.borderPublish, height: 50, width: '100%', backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>
                    </View>
                    <View style={{ width: '90%' }}>
                        <Text style={{ ...sharedStyles.textPublish }}>Date <Text style={{ color: colors.red }}>*</Text></Text>
                        {Platform.OS === 'ios' ?
                            <View style={{}}>
                                <View style={{ backgroundColor: colors.white, marginBottom: 20 }}>
                                    <DateTimePicker
                                        value={datetime}
                                        mode={"datetime"}
                                        is24Hour={true}
                                        onChange={(event, date) => setDateTime(date)}
                                        style={{ width: 210 }}
                                    />
                                </View>
                            </View>
                            :
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ ...sharedStyles.borderPublish, height: 50, width: '48%', backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ width: 105, }}>{moment((time)).format('DD/MM/YYYY')}</Text>
                                    <TouchableOpacity style={{ height: '100%', width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => setShowDate(true)}>
                                        <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../assets/calendar.png')}></Image>
                                    </TouchableOpacity>
                                    {showDate && (
                                        <DateTimePicker
                                            value={date}
                                            mode={"date"}
                                            is24Hour={true}
                                            onChange={onChangeDate}
                                        />
                                    )}
                                </View>
                                <View style={{ ...sharedStyles.borderPublish, height: 50, width: '48%', backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ width: 105 }}>{moment((time)).format('H:mm')}</Text>
                                    <TouchableOpacity style={{ height: '100%', width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => setShowTime(true)}>
                                        <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../assets/calendar.png')}></Image>
                                    </TouchableOpacity>
                                    {showTime && (
                                        <DateTimePicker
                                            value={time}
                                            mode={"time"}
                                            is24Hour={true}
                                            onChange={onChangeTime}
                                        />
                                    )}
                                </View>
                            </View>
                        }
                    </View>
                    <View style={{ width: '90%' }}>
                        <Text style={{ ...sharedStyles.textPublish }}>Nombre de places<Text style={{ color: colors.red }}> *</Text></Text>
                        <TextInput value={seats} onChangeText={(text) => setSeats(text)} style={{ ...sharedStyles.borderPublish, height: 50, width: '100%', backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }} keyboardType="number-pad"></TextInput>
                    </View>
                    <View style={{ width: '90%' }}>
                        <Text style={{ ...sharedStyles.textPublish }}>Adresse<Text style={{ color: colors.red }}> *</Text></Text>
                        <TextInput value={address} onChangeText={(text) => setAddress(text)} style={{ ...sharedStyles.borderPublish, height: 50, width: '100%', backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>
                    </View>
                    <View style={{ width: '90%' }}>
                        <Text style={{ ...sharedStyles.textPublish }}>Arrondissement<Text style={{ color: colors.red }}> *</Text></Text>
                        <TextInput value={district} onChangeText={(text) => setDistrict(text)} style={{ ...sharedStyles.borderPublish, height: 50, width: '100%', backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }} keyboardType="number-pad"></TextInput>
                    </View>
                    <View style={{ width: '90%' }}>
                        <Text style={{ ...sharedStyles.textPublish }}>Descriptif de l'événement</Text>
                        <TextInput value={description} onChangeText={(text) => setDescription(text)} style={{ ...sharedStyles.borderPublish, height: 50, width: '100%', backgroundColor: colors.white, paddingHorizontal: 15 }}></TextInput>
                        <View opacity={0.7}>
                            <Text style={{ marginBottom: 20, marginLeft: 10, fontStyle: 'italic', fontSize: 14, color: colors.grey2 }}>Donnez envie à la communauté de participer !</Text>
                        </View>
                    </View>
                    <View style={{ width: '90%', marginBottom: 40 }}>
                        <Text style={{ ...sharedStyles.textPublish }}>Photo de l'événement</Text>
                        <ImagePickerExample image={image?.uri} setParamImage={(returnImage) => setImage(returnImage)}></ImagePickerExample>
                    </View>
                    <Text style={{ color: 'red' }}>{error}</Text>
                    <TouchableOpacity onPress={sendPostTapped} style={{ ...sharedStyles.primaryButtonWithoutColor, backgroundColor: colors.primaryYellow, width: '90%' }}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Publier</Text>
                        <ActivityIndicator style={{ position: 'absolute', right: 15 }} animating={loading} color={'black'}></ActivityIndicator>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}