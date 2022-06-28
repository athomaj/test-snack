import React, { useState } from 'react';
import { SafeAreaView, Text, FlatList, Image, View, TouchableOpacity, Animated, Dimensions, Modal } from 'react-native';
import HeaderChapter from '../Components/Utils/HeaderChapter';
import { useUserContext } from '../context/UserContext';
import postApi from '../services/postApi';
import { colors } from '../utils/colors';
import { sharedStyles } from '../utils/styles';
import moment from 'moment';
import FilterComponent from '../Components/FilterComponent';

const deviceWidth = Dimensions.get('screen').width

export default function HomeContainer({ navigation }) {

    const userContext = useUserContext()

    const filter = {
        search: false,
        proposal : false,
        thisWeek: false,
        nextWeek: false,
        nextMonth: false,
        districts: null
    }

    const [leftValue, setLeftValue] = useState(new Animated.Value(0))
    const [widthValue, setWidthValue] = useState(new Animated.Value(deviceWidth * 0.15))
    const [slideIndex, setSlideIndex] = useState(0)
    const [posts, setPosts] = useState([])
    const [filterPosts, setFilterPosts] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [filterData, setFilterData] = useState([filter])

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

    function filterEvent(data, event){
        return data.filter(item => item.attributes.id_category.data.attributes.name === event)
    }

    function filterTime(type, plus, data){
        if(type === 'w'){
            const today = moment().week()
            return data.filter(item => {
                const dateItem = moment(item.attributes.date).week()
                return dateItem  === today + plus
            })
        }
        if(type === 'm'){
            const today = moment().month()
            return data.filter(item => {
                const dateItem = moment(item.attributes.date).month()
                return dateItem  === today + plus
            })
        }
    }

    function filterComp(index, filterData){
        let data = [...posts]
        if(index === 1){
            data = filterEvent(data, 'évenement')
        }
        if(index === 2){
            data = filterEvent(data, 'atelier')
        }
        if(index === 3){
            data = filterEvent(data, 'bon plan')
        }
        if(filterData){
            if(filterData.search === true){
                data = data.filter(item => item.attributes.isSearch === true)
            }
            if(filterData.proposal === true){
                data = data.filter(item => item.attributes.isSearch === false)
            }
            if(filterData.districts.length > 0){
                data = data.filter((item) => {
                    const filteredData = filterData.districts.filter((item2) => item2.isChecked === true && item2.district == item.attributes.district)
                    filteredData.length > 0 ? true : false
                })
            }
            let dataWeeks = []
            if(filterData.thisWeek === true || filterData.nextWeek === true || filterData.nextMonth === true){
                if(filterData.thisWeek === true){
                    const filteredData = filterTime('w', 0, data)
                    dataWeeks = dataWeeks.concat(filteredData)
                }
                if(filterData.nextWeek === true){
                    const filteredData = filterTime('w', 1, data)
                    dataWeeks = dataWeeks.concat(filteredData)
                }
                if(filterData.nextMonth === true){
                    const filteredData = filterTime('m', 1, data)
                    if(dataWeeks.length > 0){
                        for(let i=0;i<dataWeeks.length;i++){
                            if(filteredData.indexOf(dataWeeks[i]) === -1)
                                filteredData.push(dataWeeks[i])
                        }
                    }
                    else{
                        dataWeeks = dataWeeks.concat(filteredData)
                    }
                }
                data = dataWeeks
            }
        }
        setFilterPosts(data)
    }

    function movableButton(index){
        if(index !== slideIndex){
            setSlideIndex(index)
            filterComp(index, filterData)

            let width = 0.15
            let left = 0

            if(index === 1){
                width = 0.30
                left = 0.15
            }
            if(index === 2){
                width = 0.25
                left = 0.45
            }
            if(index === 3){
                width = 0.30
                left = 0.70
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
            <Modal animationType='fade' transparent={true} visible={modalVisible}>
                <FilterComponent filterData={filterData} closeModal={()=> setModalVisible(false)} filter={(data)=> {filterComp(slideIndex, data); setFilterData(data)}}></FilterComponent>
            </Modal>
        </View>
    );
}