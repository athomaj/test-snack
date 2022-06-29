import React, { useState } from 'react';
import { SafeAreaView, Text, FlatList, Image, View, TouchableOpacity, Animated, Dimensions, Modal, Switch } from 'react-native';
import HeaderChapter from '../Components/Utils/HeaderChapter';
import { useUserContext } from '../context/UserContext';
import { colors } from '../utils/colors';
import { sharedStyles } from '../utils/styles';
import moment from 'moment';
const deviceWidth = Dimensions.get('screen').width

export default function PublishContainer({ navigation }){

    const userContext = useUserContext();

    const [leftValue, setLeftValue] = useState(new Animated.Value(0))
    const [widthValue, setWidthValue] = useState(new Animated.Value(deviceWidth * 0.333))
    const [slideIndex, setSlideIndex] = useState(0)
    const [disabledButton, setDisabledButton] = React.useState(true)

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

    return (
        <View style={{height:'100%', width:'100%'}}>
            <SafeAreaView style={{ height: '100%', width: '100%', alignItems: 'center', backgroundColor: 'white' }}>
                <HeaderChapter text={'Publier sur Food Food'}></HeaderChapter>
                <View style={{flexDirection: "row", width:'100%', height:50, alignItems:'center', borderBottomWidth: 1, borderBottomColor: colors.primaryYellow, justifyContent:'space-between'}}>
                    <TouchableOpacity onPress={()=> movableButton(0)} style={{width:'33.3%', alignItems:'center'}}><Text>Evénements</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=> movableButton(1)} style={{width:'33.3%', alignItems:'center'}}><Text>Ateliers</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=> movableButton(2)} style={{width:'33.3%', alignItems:'center'}}><Text>Bons Plans</Text></TouchableOpacity>
                    <Animated.View style={{position:'absolute', bottom:0, left: leftValue, zIndex: 1, height:5, width: widthValue, backgroundColor: colors.primaryYellow}}></Animated.View>
                </View>
            </SafeAreaView>
        </View>
    );
}