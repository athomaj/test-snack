import React from 'react';
import { SafeAreaView, Text, FlatList, Image, View, TouchableOpacity, Dimensions, Modal, StyleSheet } from 'react-native';
import moment from 'moment';

import { PostListItemComponent } from '../Components/PostListItemComponent';
import FilterComponent from '../Components/FilterComponent';

import { useUserContext } from '../context/UserContext';

import postApi from '../services/postApi';

import { colors } from '../utils/colors';
import { useFocusEffect } from '@react-navigation/native';

const deviceHeight = Dimensions.get('screen').height

export default function HomeContainer({ navigation }) {

    const userContext = useUserContext()

    const [posts, setPosts] = React.useState([])
    const [filterPosts, setFilterPosts] = React.useState([])
    const [modalVisible, setModalVisible] = React.useState(false)
    const [filters, setFilters] = React.useState(null)
    const [error, setError] = React.useState(false)

    useFocusEffect(
        React.useCallback(() => {
            getPosts()
        }, [])
    );

    async function getPosts() {
        const data = await postApi.getPosts()
        if (data) {
            // console.log(data)
            setPosts(data)
            setFilterPosts(data)
        } else {
            setError(true)
        }
    }

    function filtersPosts(filterData) {
        let data = [...posts]
        const newKitchen = []
        const newDiet = []
        const newLevel = []
        if (filterData) {
            filterData.kitchen.map((data) => {
                if (data["status"] === true) {
                    newKitchen.push(data.title)
                }
            })
            filterData.diet.map((data) => {
                if (data["status"] === true) {
                    newDiet.push(data.title)
                }
            })
            filterData.level.map((data) => {
                if (data["status"] === true) {
                    newLevel.push(data.title)
                }
            })

            if (filterData.dateValue) {
                data = data.filter(item => moment(item.attributes.datetime).format('D/MM/YYYY') === moment(filterData.date).format('D/MM/YYYY'))
            }
            // if (filterData.district) {
            //     data = data.filter(item => item.attributes.district === parseInt(filterData.district))
            // }
            if (filterData.category) {
                data = data.filter(item => item.attributes.category.data.attributes.name === filterData.category)
            }
            if (newKitchen?.length > 0) {
                data = data.filter((item) => {
                    return item.attributes.kitchens.data.filter(item => newKitchen.includes(item.attributes.name)).length > 0
                })
            }
            if (newDiet?.length > 0) {
                data = data.filter((item) => {
                    return item.attributes.diets.data.filter(item => newDiet.includes(item.attributes.name)).length > 0
                })
            }
            if (newLevel?.length > 0) {
                data = data.filter((item) => {
                    return newLevel.includes(item.attributes.level.data.attributes.name)
                })
            }
        }
        setFilterPosts(data)
    }

    function updateFilters(data, close) {
        setFilters(data)
        filtersPosts(data)
        if (close) {
            setModalVisible(false)
        }
    }

    const flatListKeyExtractor = React.useCallback((item) => "" + item.id, []);

    const renderItem = React.useCallback(
        ({ item, index }) => <PostListItemComponent item={item} index={index} navigateTo={() => navigation.navigate("PostDetail", { index: item.id })}></PostListItemComponent>,
        []
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height: '100%', width: '100%' }}>
                <FlatList
                    ListHeaderComponentStyle={{ backgroundColor: 'white', paddingHorizontal: 10 }}
                    ListHeaderComponent={(
                        <>
                            <View style={styles.header}>
                                <Image style={styles.imageHeader} source={require('../assets/icon/defaultImage.png')} />
                                <View style={styles.titleSize}>
                                    <Text style={styles.title}>{'Bonjour ' + userContext.authState.user.username}</Text>
                                </View>
                                <TouchableOpacity style={styles.searchBar} onPress={() => setModalVisible(true)}>
                                    <Image style={styles.searchPicture} source={require('../assets/icon/search.png')} />
                                    <Text style={styles.searchInput}>Que recherchez-vous ?</Text>
                                </TouchableOpacity>
                            </View>
                            {filterPosts.length === 0 &&
                                <View style={{ height: deviceHeight * 0.6, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>Aucuns Posts Disponibles</Text>
                                    {error &&
                                        <Text style={{color: 'red'}}>Une erreur est survenue</Text>
                                    }
                                </View>
                            }
                        </>
                    )}
                    data={filterPosts}
                    renderItem={renderItem}
                    keyExtractor={flatListKeyExtractor}
                    style={{ height: '100%', width: '100%' }}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    stickyHeaderIndices={[0]}
                />
                {modalVisible &&
                    <Modal animationType='fade' transparent={true} visible={modalVisible}>
                        <FilterComponent filters={filters} closeModal={() => setModalVisible(false)} updateFilters={updateFilters}></FilterComponent>
                    </Modal>
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
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