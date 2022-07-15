import React, { useState } from 'react';
import { SafeAreaView, Text, FlatList, Image, View, TouchableOpacity, Animated, Dimensions, Modal, StyleSheet, TextInput } from 'react-native';
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
            <SafeAreaView style={ styles.container }>
                <FlatList
                    ListHeaderComponentStyle={{ backgroundColor: 'white' }}
                    ListHeaderComponent={(
                        <>
                            <View style={styles.header}>
                                <Image style={styles.imageHeader} source={require('../assets/icon/defaultImage.png')}/>
                                <View style={styles.titleSize}>
                                    <Text style={styles.title}>{'Bonjour ' + userContext.authState.user.username}</Text>
                                </View>
                                <TouchableOpacity style={styles.searchBar} onPress={() => setModalVisible(true)}>
                                    <Image style={styles.searchPicture} source={require('../assets/icon/search.png')}/>
                                    <Text style={styles.searchInput}>Que recherchez-vous ?</Text>
                                </TouchableOpacity>
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
            </SafeAreaView>
            {modalVisible &&
                <Modal animationType='fade' transparent={true} visible={modalVisible}>
                    <FilterComponent filters={filters} closeModal={() => setModalVisible(false)} updateFilters={updateFilters}></FilterComponent>
                </Modal>
            }
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '5%'
    },

    header: {
        height: 200,
        width: '100%',
        paddingTop: '5%',
        justifyContent: 'center'
    },

    title: {
        fontWeight: '600',
        fontSize: 30,
        color: colors.primaryBlue,
    },

    titleSize: {
        height: 60,
        justifyContent: 'center'
    },

    imageHeader: {
        width: 46,
        height: 37
    },

    searchBar: {
        backgroundColor: colors.secondaryBlue,
        height: 44,
        alignItems: "center",
        flexDirection: "row",
        padding: '2%',
        borderRadius: 4,
    },

    searchPicture: {
        width: 19,
        height: 19,
    },

    searchInput: {
        left: 10,
        width: '90%',
        color: colors.primaryBlue,
    },
})