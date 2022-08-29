import React from 'react';
import { SafeAreaView, Text, FlatList, Image, View, TouchableOpacity, Dimensions, Modal, StyleSheet } from 'react-native';
import moment from 'moment';
import { PostListItemComponent } from '../Components/PostListItemComponent';
import FilterComponent from '../Components/FilterComponent';
import { useUserContext } from '../context/UserContext';
import postApi from '../services/postApi';
import { colors } from '../utils/colors';
import { useFocusEffect } from '@react-navigation/native';
import { sharedStyles } from '../utils/styles';
import userApi from '../services/userApi';

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
        const Mycity = await userApi.getMyCity()
        const data = await postApi.getEventbyCity(Mycity.name)

        if (data) {
            const postValide = data.filter((post) => {
                const dateOfPost = moment(post.attributes.datetime).format('LT').includes('PM') ? parseInt(moment(post.attributes.datetime).format('LT').slice(0, post.attributes.datetime.indexOf(':')-1))+12 : parseInt(moment(post.attributes.datetime).format('LT').slice(0, post.attributes.datetime.indexOf(':')-1))
                const dateNow = moment().format('LT').includes('PM') ? parseInt(moment().format('LT').slice(0,moment().format('LT').indexOf(':')))+12 : parseInt(moment().format('LT').slice(0,moment().format('LT').indexOf(':')))
                if(moment(post.attributes.datetime).format('L') > moment().format('L') || (moment(post.attributes.datetime).format('L') === moment().format('L') && dateOfPost > dateNow)){
                    return true
                } else false
            })
            setPosts(postValide)
            setFilterPosts(postValide)
        } else {
            setError(true)
        }
    }

    function ShortName(pseudo){
         if(pseudo.includes(' ')){
             const shortPseudo = pseudo.slice(0, pseudo.indexOf(' '))
             return shortPseudo
         }
         return pseudo

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
    //navigation.navigate('Profil',{ userId: item.}
    const renderItem = React.useCallback(
        ({ item, index }) => <PostListItemComponent item={item} index={index} navigateTo={() => navigation.navigate("PostDetail", { index: item.id})}></PostListItemComponent>,
        []
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={{...sharedStyles.wrapperHeaderSpace, paddingTop: '5%'}}>
                <FlatList
                    ListHeaderComponentStyle={{ backgroundColor: colors.backgroundColor, paddingHorizontal: 15 }}
                    ListHeaderComponent={(
                        <>
                            <View style={styles.header}>
                                <Image style={styles.imageHeader} source={require('../assets/logo.png')} />
                                <Text style={styles.title}><Text style={{...sharedStyles.h2}}>Bonjour </Text>{ShortName(userContext.authState.user.username)}</Text>
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
        backgroundColor: colors.backgroundColor
    },

    header: {
        height: 200,
        width: '100%',
        justifyContent: 'center'
    },

    title: {
        fontFamily: 'Syne',
        fontWeight: '600',
        fontSize: 24,
        color: colors.green1,
        textAlign: 'center',
        marginBottom: 20
    },

    imageHeader: {
        width: '33%',
        height: 55,
        resizeMode: 'contain',
        alignSelf: 'center'
    },

    searchBar: {
        backgroundColor: 'white',
        height: 44,
        alignItems: "center",
        flexDirection: "row",
        padding: '2%',
        borderRadius: 4,
        paddingHorizontal: 12,
    },

    searchPicture: {
        width: 19,
        height: 19,
    },

    searchInput: {
        left: 10,
        width: '90%',
        color: colors.darkGreen,
    },
})