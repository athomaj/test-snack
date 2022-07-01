import React, { useState } from 'react';
import { SafeAreaView, Text, FlatList, Image, View, TouchableOpacity, Animated, Dimensions, Modal, Switch, TextInput, ScrollView } from 'react-native';
import HeaderChapter from '../Components/Utils/HeaderChapter';
import { useUserContext } from '../context/UserContext';
import { colors } from '../utils/colors';
import { sharedStyles } from '../utils/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Platform } from 'react-native';
import ImagePickerExample from '../Components/Utils/imagePicker';
const deviceWidth = Dimensions.get('screen').width

export default function PublishContainer({ navigation }){

    const userContext = useUserContext();

    const [leftValue, setLeftValue] = useState(new Animated.Value(0))
    const [widthValue, setWidthValue] = useState(new Animated.Value(deviceWidth * 0.333))
    const [slideIndex, setSlideIndex] = useState(0)
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [datetime, setDateTime] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [image, setImage] = React.useState(null)
    const [title, setTitle] = React.useState('')
    const [seats, setSeats] = React.useState()
    const [description, setDescription] = React.useState()
    const [isSearch, setIsSearch] = React.useState(true)

    React.useEffect(() => {
        if (!userContext.authState.isConnected) {
            navigation.navigate('AuthStack')
        }
    }, [userContext.authState.isConnected, userContext.authState.errorMessage])

    function movableButton(index){
        if(index !== slideIndex){
            setSlideIndex(index)

            let width = 0.333
            let left = 0

            if(index === 1){
                width = 0.333
                left = 0.333
            }
            if(index === 2){
                width = 0.333
                left = 0.667
            }

            Animated.parallel([
                Animated.timing(leftValue, {
                    toValue: deviceWidth * left,
                    duration: 300,
                    useNativeDriver: false
                }),
                Animated.timing(widthValue, {
                    toValue: deviceWidth * width,
                    duration: 300,
                    useNativeDriver: false
                })
            ]).start()
        }
    }

    const onChangeTime = (event, selectedDate) => {
        console.log("time", selectedDate)
        setShow(false);
        setTime(selectedDate);
    };

    const onChangeDate = (event, selectedDate) => {
        console.log("date", selectedDate + "")
        setShow(false);
        setDate(selectedDate);
    };

    const onChangeDateTime = (event, selectedDate) => {
        setShow(false);
        setDateTime(selectedDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDateTimePicker = () => {
        showMode('datetime');
    };

    const showDatePicker = () => {
        showMode('date');
    };

    const showTimePicker = () => {
        showMode('time');
    };

    function sendData(){
        const data = {
            post: {
                titre: title,
                date: "",
                time: "",
                seats: seats,
                description: description,
                isSearch: !isSearch
            },
            picture: image?.uri
        }
    }

    function onChangeText(text, inputText){
        
    }

    return (
        <View style={{height:'100%', width:'100%'}}>
            <SafeAreaView style={{ height: '100%', width: '100%', alignItems: 'center', backgroundColor: 'white' }}>
                <View style={{ zIndex: 1, position: 'absolute', width: '100%', backgroundColor: 'white'}}>
                    <HeaderChapter text={'Publier sur Food Food'}></HeaderChapter>
                    <View style={{flexDirection: "row", width:'100%', height:50, alignItems:'center', borderBottomWidth: 1, borderBottomColor: colors.primaryYellow, justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={()=> movableButton(0)} style={{width:'33.3%', alignItems:'center'}}><Text>Evénements</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=> movableButton(1)} style={{width:'33.3%', alignItems:'center'}}><Text>Ateliers</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=> movableButton(2)} style={{width:'33.3%', alignItems:'center'}}><Text>Bons Plans</Text></TouchableOpacity>
                        <Animated.View style={{position:'absolute', bottom:0, left: leftValue, zIndex: 1, height:5, width: widthValue, backgroundColor: colors.primaryYellow}}></Animated.View>
                    </View>
                </View>
                <ScrollView style={{width: '100%', height: '100%'}} contentContainerStyle={{paddingTop: 170, paddingBottom: 20}}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop: 10}}>
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
                    <View style={{width: '100%', marginLeft: '5%'}}>
                        <Text style={{...sharedStyles.textPublish}}>Titre de l'évenement <Text style={{color: colors.red}}>*</Text></Text>
                        <TextInput value={title} onValueChange={(text) => setTitle(text)} style={{ ...sharedStyles.borderPublish, height: 50, width: '90%', backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>
                    </View>
                    <View style={{width: '100%', marginLeft: '5%'}}>
                    <Text style={{...sharedStyles.textPublish}}>Date <Text style={{color: colors.red}}>*</Text></Text>
                        {Platform.OS === 'ios' ?
                        <View style={{ ...sharedStyles.borderPublish, height: 50, width: '90%', backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20, flexDirection:'row', alignItems: 'center' }}>
                            <Text style={{width: 270}}>{moment((datetime)).format('DD/MM/YYYY, H:mm')}</Text>
                            <TouchableOpacity style={{height: '100%', width: '20%', justifyContent: 'center', alignItems: 'center'}} onPress={showDateTimePicker}>
                                <Image style={{width: 20, height: 20, resizeMode: 'contain'}}source={require('../assets/calendar.png')}></Image>
                            </TouchableOpacity>
                                {show && (
                                    <DateTimePicker
                                    value={datetime}
                                    mode={mode}
                                    is24Hour={true}
                                    onChange={onChangeDateTime}
                                    />
                                )}
                        </View>
                        :
                        <View style={{flexDirection: 'row'}}>
                            <View style={{ ...sharedStyles.borderPublish, height: 50, width: '42.5%', backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20, flexDirection:'row', alignItems: 'center', marginRight: '5%' }}>
                                <Text style={{width: 105}}>{moment((time)).format('DD/MM/YYYY')}</Text>
                                <TouchableOpacity style={{height: '100%', width: '20%', justifyContent: 'center', alignItems: 'center'}} onPress={showDatePicker}>
                                    <Image style={{width: 20, height: 20, resizeMode: 'contain'}}source={require('../assets/calendar.png')}></Image>
                                </TouchableOpacity>
                                    {show && (
                                        <DateTimePicker
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        onChange={onChangeDate}
                                        />
                                    )}
                            </View>
                            <View style={{ ...sharedStyles.borderPublish, height: 50, width: '42.5%', backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20, flexDirection:'row', alignItems: 'center' }}>
                                <Text style={{width: 105}}>{moment((time)).format('H:mm')}</Text>
                                <TouchableOpacity style={{height: '100%', width: '20%', justifyContent: 'center', alignItems: 'center'}} onPress={showTimePicker}>
                                    <Image style={{width: 20, height: 20, resizeMode: 'contain'}} source={require('../assets/calendar.png')}></Image>
                                </TouchableOpacity>
                                    {show && (
                                        <DateTimePicker
                                        value={time}
                                        mode={mode}
                                        is24Hour={true}
                                        onChange={onChangeTime}
                                        />
                                    )}
                            </View>
                        </View>
                        }
                    </View>
                    <View style={{width: '100%', marginLeft: '5%'}}>
                        <Text style={{...sharedStyles.textPublish}}>Nombre de places <Text style={{color: colors.red}}>*</Text></Text>
                        <TextInput style={{ ...sharedStyles.borderPublish, height: 50, width: '90%', backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }} keyboardType="number-pad"></TextInput>
                    </View>
                    <View style={{width: '100%', marginLeft: '5%'}}>
                        <Text style={{...sharedStyles.textPublish}}>Descriptif de l'événement</Text>
                        <TextInput style={{ ...sharedStyles.borderPublish, height: 50, width: '90%', backgroundColor: colors.white, paddingHorizontal: 15 }}></TextInput>
                        <View opacity={0.7}>
                            <Text style={{ marginBottom: 20, marginLeft: 10, fontStyle: 'italic', fontSize: 14, color: colors.grey2}}>Donnez envie à la communauté de participer !</Text>
                        </View>
                    </View>
                    <View style={{width: '100%', marginLeft: '5%'}}>
                        <Text style={{...sharedStyles.textPublish}}>Photo de l'événement</Text>
                        <ImagePickerExample image={image?.uri} setParamImage={(returnImage) => setImage(returnImage)}></ImagePickerExample>
                    </View>
                    <TouchableOpacity style={{ ...sharedStyles.primaryButtonWithoutColor, backgroundColor: colors.primaryYellow, marginTop: 40, marginLeft:'10%' }}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Publier</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}