import React, { useState } from 'react';
import { SafeAreaView, Text, FlatList, Image, View, TouchableOpacity, Animated, Dimensions, Modal } from 'react-native';
import HeaderChapter from '../Components/Utils/HeaderChapter';
import { useUserContext } from '../context/UserContext';
import postApi from '../services/postApi';
import { colors } from '../utils/colors';
import { sharedStyles } from '../utils/styles';
import moment from 'moment';
import FilterComponent from '../Components/FilterComponent';
import { sharedStyles } from '../utils/styles';

const deviceWidth = Dimensions.get('screen').width

export default function HomeContainer({ navigation }) {

    const userContext = useUserContext()


    const [leftValue, setLeftValue] = useState(new Animated.Value(0))
    const [widthValue, setWidthValue] = useState(new Animated.Value(deviceWidth * 0.15))
    const [slideIndex, setSlideIndex] = useState(0)
    const [posts, setPosts] = useState([])
    const [filterPosts, setFilterPosts] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [thisWeek, setThisWeek] = useState(false)
    const [nextWeek, setNextWeek] = useState(false)
    const [nextMonth, setNextMonth] = useState(false)
    const [proposal, setProposal] = useState(false)
    const [search, setSearch] = useState(false)

    var currentWeekNumber = require('current-week-number');

    React.useEffect(() => {
        getPosts()
    }, [])

    async function getPosts(){
        const data = await postApi.display()
        setPosts(data)
        setFilterPosts(data)
    }

    const flatListKeyExtractor = React.useCallback((item) => "" + item.id, []);

    const renderItem = React.useCallback(
        ({ item, index }) =>
            <View style={{ paddingHorizontal: 20, paddingTop: index === 0 ? 20 : 0 }}>
                <View style={{ ...sharedStyles.shadow, height: 306, width: '100%', backgroundColor: 'white', marginBottom: 20, borderRadius: 10 }}>
                    <Image style={{ height: 141, width: '100%', resizeMode: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} source={require('../assets/paysage.jpeg')}></Image>
                    <View style={{backgroundColor: colors.white, position: 'absolute', right:0, padding:10, borderRadius: 10}}>{<Text style={{fontSize: 12}}>{item.attributes.isSearch === false ? 'Proposition': 'Recherche'}</Text>}</View>
                    <View style={{ backgroundColor: colors.white, paddingHorizontal: 10, paddingTop: 10 }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.black, textTransform: 'uppercase', fontWeight: '400' }}>{item.attributes.id_category.data.attributes.name}</Text>
                        <Text style={{ width:245, height: 30, fontSize: 25, fontWeight: 'bold', color: colors.black }}>{item.attributes.title}</Text>
                        <Text style={{ marginTop:10, fontSize: 12, fontWeight: 'bold', color: colors.black }}>{moment((item.attributes.date)).format('DD/MM/YYYY')+' - '+(item.attributes.address)+(item.attributes.isSearch === false ? ' - '+(item.attributes.seats)+' places' : '') }</Text>
                        <Text style={{ marginTop: 10, fontSize: 12, fontWeight: 'normal', color: colors.black }}>{item.attributes.description}</Text>
                    </View>
                </View>
            </View>,
        []
    );

    function movableButton(index){
        if(index !== slideIndex){
            let data = [...posts]
            setSlideIndex(index)

            let width = 0.15
            let left = 0

            if(index === 1){
                width = 0.30
                left = 0.15
                data = data.filter(item => item.attributes.id_category.data.attributes.name === 'évenement')
            }
            if(index === 2){
                width = 0.25
                left = 0.45
                data = data.filter(item => item.attributes.id_category.data.attributes.name === 'atelier')
            }
            if(index === 3){
                width = 0.30
                left = 0.70
                data = data.filter(item => item.attributes.id_category.data.attributes.name === 'bon plan')
            }
            if(search === true){
                data = data.filter(item => item.attributes.isSearch === true)
            }
            if(proposal === true){
                data = data.filter(item => item.attributes.isSearch === false)
            }
            if(thisWeek === true){
                const today = moment().week()
                data = data.filter(item => {
                    const dateItem = moment(item.attributes.date).week()
                    return dateItem === today
                })
            }
            setFilterPosts(data)

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
                    data={filterPosts}
                    renderItem={renderItem}
                    keyExtractor={flatListKeyExtractor}
                    style={{ height: '100%', width: '100%' }}
                    stickyHeaderIndices={[0]}
                />
                <TouchableOpacity style={{position: 'absolute', bottom: 50, right: 20}} onPress={()=> setModalVisible(true)}>
                    <Image style={{width: 75, height: 75}} source={require('../assets/filterButton.png')}></Image>
                </TouchableOpacity>
            </SafeAreaView>
            <Modal animationType='fade' transparent={modalVisible} visible={modalVisible}>
                <FilterComponent setModalVisible={()=> setModalVisible(false)} setSearch={setSearch} setProposal={setProposal} setThisWeek={setThisWeek} setNextWeek={setNextWeek} setNextMonth={setNextMonth}></FilterComponent>
            </Modal>
        </View>
    );
}