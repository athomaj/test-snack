import React, { useState } from 'react';
import { SafeAreaView, Text, FlatList, Image, View, TouchableOpacity, Animated, Dimensions, Modal } from 'react-native';
import HeaderChapter from '../Components/Utils/HeaderChapter';
import { useUserContext } from '../context/UserContext';

import { colors } from '../utils/colors';
import { sharedStyles } from '../utils/styles';
import moment from 'moment';
import FilterComponent from '../Components/FilterComponent';
import postApi from '../services/postApi';
import { PostComponent } from '../Components/PostComponent';

const deviceHeight = Dimensions.get('screen').height
const deviceWidth = Dimensions.get('screen').width

export default function HomeContainer({ navigation }) {

    const userContext = useUserContext()

    const [leftValue, setLeftValue] = useState(new Animated.Value(0))
    const [widthValue, setWidthValue] = useState(new Animated.Value(deviceWidth * 0.15))
    const [slideIndex, setSlideIndex] = useState(0)
    const [posts, setPosts] = useState([])
    const [filterPosts, setFilterPosts] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [filters, setFilters] = useState(null)

    React.useEffect(() => {
        getPosts()
    }, [])

    async function getPosts() {
        const data = await postApi.display()
        if (data) {
            setPosts(data)
            setFilterPosts(data)
        }
    }

    function filterEvent(data, event) {
        return data.filter(item => item.attributes.category.data.attributes.name.toLowerCase() === event)
    }

    function filterTime(type, plus, data) {
        if (type === 'w') {
            const today = moment().week()
            return data.filter(item => {
                const dateItem = moment(item.attributes.date).week()
                return dateItem === today + plus
            })
        }
        if (type === 'm') {
            const today = moment().month()
            return data.filter(item => {
                const dateItem = moment(item.attributes.date).month()
                return dateItem === today + plus
            })
        }
    }

    function filtersPosts(index, filterData) {
        let data = [...posts]
        if (index === 1) {
            data = filterEvent(data, 'événements')
        }
        if (index === 2) {
            data = filterEvent(data, 'ateliers')
        }
        if (index === 3) {
            data = filterEvent(data, 'bons plans')
        }
        if (filterData) {
            if (filterData.search === true) {
                data = data.filter(item => item.attributes.isSearch === true)
                console.log("DATA ===", data)
            }
            if (filterData.proposal === true) {
                data = data.filter(item => item.attributes.isSearch === false)
                console.log("DATA 2 ===", data)
            }
            if (filterData.districts?.length > 0) {
                data = data.filter((item) => {
                    const filteredData = filterData.districts.flatMap(item => {return item.isChecked ? item.district : ""})
                    console.log(filteredData)
                    return filteredData.includes("" + item.attributes.district)
                })
                console.log("DATA 3 ===", data)
            }
            let dataWeeks = []
            if (filterData.thisWeek === true || filterData.nextWeek === true || filterData.nextMonth === true) {
                if (filterData.thisWeek === true) {
                    const filteredData = filterTime('w', 0, data)
                    dataWeeks = dataWeeks.concat(filteredData)
                }
                if (filterData.nextWeek === true) {
                    const filteredData = filterTime('w', 1, data)
                    dataWeeks = dataWeeks.concat(filteredData)
                }
                if (filterData.nextMonth === true) {
                    const filteredData = filterTime('m', 1, data)
                    if (dataWeeks.length > 0) {
                        for (let i = 0; i < dataWeeks.length; i++) {
                            if (filteredData.indexOf(dataWeeks[i]) === -1)
                                filteredData.push(dataWeeks[i])
                        }
                    }
                    else {
                        dataWeeks = dataWeeks.concat(filteredData)
                    }
                }
                data = dataWeeks
            }
        }
        setFilterPosts(data)
    }

    function movableButton(index) {
        if (index !== slideIndex) {
            let width = 0.15
            let left = 0

            if (index === 1) {
                width = 0.30
                left = 0.15
            }
            if (index === 2) {
                width = 0.25
                left = 0.45
            }
            if (index === 3) {
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

            setSlideIndex(index)
            filtersPosts(index, filters)
        }
    }

    function updateFilters(data) {
        setFilters(data)
        filtersPosts(slideIndex, data)
        setModalVisible(false)
    }

    const flatListKeyExtractor = React.useCallback((item) => "" + item.id, []);

    const renderItem = React.useCallback(
        ({ item, index }) => <PostComponent item={item} index={index}></PostComponent>,
        []
    );

    return (
        <View style={{ height: '100%', width: '100%' }}>
            <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <FlatList
                    ListHeaderComponentStyle={{ backgroundColor: 'white' }}
                    ListHeaderComponent={(
                        <>
                            <HeaderChapter text={'Bonjour ' + userContext.authState.user.username}></HeaderChapter>
                            <View style={{ flexDirection: "row", width: '100%', height: 50, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.primaryYellow }}>
                                <TouchableOpacity onPress={() => movableButton(0)} style={{ width: '15%', alignItems: 'center' }}><Text>Tout</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => movableButton(1)} style={{ width: '30%', alignItems: 'center' }}><Text>Événements</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => movableButton(2)} style={{ width: '25%', alignItems: 'center' }}><Text>Ateliers</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => movableButton(3)} style={{ width: '30%', alignItems: 'center' }}><Text>Bons Plans</Text></TouchableOpacity>
                                <Animated.View style={{ position: 'absolute', bottom: 0, left: leftValue, zIndex: 1, height: 5, width: widthValue, backgroundColor: colors.primaryYellow }}></Animated.View>
                            </View>
                            {filterPosts.length === 0 &&
                                <View style={{ height: deviceHeight * 0.6, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>Aucuns Posts Disponibles</Text>
                                </View>
                            }
                        </>
                    )}
                    data={filterPosts}
                    renderItem={renderItem}
                    keyExtractor={flatListKeyExtractor}
                    style={{ height: '100%', width: '100%' }}
                    stickyHeaderIndices={[0]}
                />
                <TouchableOpacity style={{ position: 'absolute', bottom: 15, right: 15 }} onPress={() => setModalVisible(true)}>
                    <Image style={{ width: 75, height: 75 }} source={require('../assets/filterButton.png')}></Image>
                </TouchableOpacity>
            </SafeAreaView>
            {modalVisible &&
                <Modal animationType='fade' transparent={true} visible={modalVisible}>
                    <FilterComponent filters={filters} closeModal={() => setModalVisible(false)} updateFilters={updateFilters}></FilterComponent>
                </Modal>
            }
        </View>
    );
}