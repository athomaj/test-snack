import React, { useState } from 'react';
import { SafeAreaView, Text, FlatList, Image, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import HeaderChapter from '../Components/Utils/HeaderChapter';
import { useUserContext } from '../context/UserContext';
import { feedHomeData } from '../fakeData/feedHome';
import { colors } from '../utils/colors';
import styles, { sharedStyles } from '../utils/styles';

const deviceWidth = Dimensions.get('screen').width

export default function HomeContainer({ navigation }) {

    const userContext = useUserContext()

    React.useEffect(() => {
        console.log('Main', userContext)
    }, [])

    const flatListKeyExtractor = React.useCallback((item) => "" + item.id, []);

    const renderItem = React.useCallback(
        ({ item, index }) =>
            <View style={{ paddingHorizontal: 20, paddingTop: index === 0 ? 20 : 0 }}>
                <View style={{ ...sharedStyles.shadow, height: 160, width: '100%', backgroundColor: 'white', marginBottom: 20, borderRadius: 10 }}>
                    <Image style={{ height: 100, width: '100%', resizeMode: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} source={require('../assets/paysage.jpeg')}></Image>
                    <View style={{ height: 60, width: '100%', paddingHorizontal: 10, paddingTop: 10 }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.black }}>{item.title}</Text>
                        <Text style={{ fontSize: 13, fontWeight: 'normal', color: colors.black }}>{item.description}</Text>
                    </View>
                </View>
            </View>,
        []
    );


    const [leftValue, setLeftValue] = useState(new Animated.Value(0))
    const [widthValue, setWidthValue] = useState(new Animated.Value(deviceWidth * 0.15))

    function movableButton(index){
        if(index == 0){
            Animated.parallel([
                Animated.timing(leftValue, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false
                }),
                Animated.timing(widthValue, {
                    toValue: deviceWidth * 0.15,
                    duration: 500,
                    useNativeDriver: false
                })
            ]).start()
        }
        if(index == 1){
            Animated.parallel([
                Animated.timing(leftValue, {
                    toValue: deviceWidth * 0.15,
                    duration: 500,
                    useNativeDriver: false
                }),
                Animated.timing(widthValue, {
                    toValue: deviceWidth * 0.30,
                    duration: 500,
                    useNativeDriver: false
                })
            ]).start()
        }
        if(index == 2){
            Animated.parallel([
                Animated.timing(leftValue, {
                    toValue: deviceWidth * 0.45,
                    duration: 500,
                    useNativeDriver: false
                }),
                Animated.timing(widthValue, {
                    toValue: deviceWidth * 0.25,
                    duration: 500,
                    useNativeDriver: false
                })
            ]).start()
        }
        if(index == 3){
            Animated.parallel([
                Animated.timing(leftValue, {
                    toValue: deviceWidth * 0.70,
                    duration: 500,
                    useNativeDriver: false
                }),
                Animated.timing(widthValue, {
                    toValue: deviceWidth * 0.30,
                    duration: 500,
                    useNativeDriver: false
                })
            ]).start()
        }
    }

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <FlatList
                ListHeaderComponentStyle={{backgroundColor:'white'}}
                    ListHeaderComponent={(
                        <>
                        <HeaderChapter text={'Bonjour '+userContext.authState.user.username}></HeaderChapter>
                        <View style={{flexDirection: "row", width:'100%', height:50, alignItems:'center', borderBottomWidth: 1, borderBottomColor: colors.primaryYellow}}>
                            <TouchableOpacity onPress={()=> movableButton(0)} style={{width:'15%', alignItems:'center'}}><Text>Tout</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=> movableButton(1)} style={{width:'30%', alignItems:'center'}}><Text>Evénements</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=> movableButton(2)} style={{width:'25%', alignItems:'center'}}><Text>Ateliers</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=> movableButton(3)} style={{width:'30%', alignItems:'center'}}><Text>Bons Plans</Text></TouchableOpacity>
                            <Animated.View style={{position:'absolute', bottom:0, left: leftValue, zIndex: 1, height:5, width: widthValue, backgroundColor: colors.primaryYellow}}></Animated.View>
                        </View>
                        </>
                    )}
                    data={feedHomeData}
                    renderItem={renderItem}
                    keyExtractor={flatListKeyExtractor}
                    style={{ height: '100%', width: '100%' }}
                    stickyHeaderIndices={[0]}
                />
        </SafeAreaView>
    );
}