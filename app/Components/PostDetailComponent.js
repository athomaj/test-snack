import React from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../utils/colors';
import postApi from '../services/postApi';
import moment from 'moment';
import { isIphoneX } from '../utils/isIphoneX';

export function PostDetailComponent({ navigation, route }) {

    const [post, setPost] = React.useState(null)
    const [diet, setDiet] = React.useState(null)
    const [badge, setBadge] = React.useState([{ 'id': 1, 'name': 'Super organisateur' }, { 'id': 2, 'name': 'Badge 2' }, { 'id': 3, 'name': 'Badge 3' }])
    const [bring, setBring] = React.useState([{ 'id': 1, 'name': 'Un dessert de votre choix' }, { 'id': 2, 'name': 'Une boisson non alcooliser' }, { 'id': 3, 'name': '300g de Beurre' }])
    const [info, setInfo] = React.useState([{ 'id': 1, 'name': 'Animaux de compagnie' }, { 'id': 2, 'name': 'Non fumeur' }, { 'id': 3, 'name': 'Place de parking sur place' }])

    React.useEffect(() => {
        fetchData(route.params.index)
    }, [])

    async function fetchData(id) {
        const response = await postApi.getOne(id)
        // console.log("REES ====", JSON.parse(response.attributes.moreInfo))
        setPost(response)
        setDiet([...response.attributes.diets.data])
        const infoParse = JSON.parse(response.attributes.moreInfo)
        const array = []
        infoParse.map(item => {
            if (item.status === true) {
                array.push({id: item.id, name: item.title })
            }
        })
        setInfo(array)
        return response
    }

    const renderDiet = ({ item }) => (
        <View style={styles.viewDiet}>
            <Image style={styles.imageDiet} source={require('../assets/icon/blueCarrot.png')} />
            <Text style={styles.textDiet}>{item.attributes.name}</Text>
        </View>
    );

    return (
        <View>
            <ScrollView style={styles.container}>
                <View style={styles.top}>
                    {post &&
                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: post.attributes.avatarUrl }} />
                    }
                    <TouchableOpacity onPress={navigation.goBack} style={styles.backBox}>
                        <Text style={styles.back}>{'x'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View>
                        <Text style={styles.title}>{post?.attributes.title}</Text>
                        <Text style={styles.desc}>{post?.attributes.description}</Text>
                    </View>
                    <View style={styles.diet}>
                        <Text style={styles.multipleTitle}>Régime alimentaire</Text>
                        <FlatList
                            scrollEnabled={false}
                            data={diet}
                            numColumns={3}
                            renderItem={renderDiet}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={styles.user}>
                        <View style={styles.topUser}>
                            <View>
                                <Text style={styles.username}>{post?.attributes.user.data.attributes.username}</Text>
                                <Text style={styles.partEvent}>Votre hôte</Text>
                                {/* <Text style={styles.partEvent}>Participation à 'undefined' évènement</Text> */}
                            </View>
                            <Image style={styles.userPicture} source={{ uri: post?.attributes.user.data.attributes.avatarUrl }} />
                        </View>
                        <View style={styles.flatlistUser}>
                            {badge.map((item) => (
                                <View key={item.id} style={styles.badge}>
                                    <Image style={styles.man} source={require('../assets/icon/man.png')} />
                                    <Text style={styles.badgeText}>{item.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View styles={styles.bring}>
                        <Text style={styles.multipleTitle}>Ce que vous devrez amemer</Text>
                        {bring.map((item) => (
                            <View key={item.id} style={styles.badge}>
                                <View style={styles.dot} />
                                <Text style={styles.badgeText}>{item.name}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.place}>
                        <Text style={styles.multipleTitle}>Lieu de rendez-vous</Text>
                        <Text style={styles.placeText}>{post?.attributes.user.data.attributes.username}</Text>
                        <Text style={styles.placeText}>{post?.attributes.address + ', ' + post?.attributes.postalCode.data?.attributes.name}</Text>
                        <View style={styles.flatlistUser}>
                            {info.map((item) => (
                                <View key={item.id} style={styles.badge}>
                                    <Image style={styles.man} source={require('../assets/icon/man.png')} />
                                    <Text style={styles.badgeText}>{item.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <View>
                    <Text style={styles.date}>{moment(post?.attributes.datetime).format("MMMM Do à h") + 'h'}</Text>
                    <Text style={styles.seats}>{post?.attributes.seats + ' place disponible'}</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.participate}>Participer</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.white
    },

    back: {
        fontWeight: '500',
        fontSize: 22,
        color: colors.primaryBlue,
    },

    backBox: {
        position: 'absolute',
        top: isIphoneX() ? 60 : 20,
        left: 20,
        height: 30,
        width: 30,
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 40
    },

    top: {
        height: 375,
        width: '100%',
        backgroundColor: colors.backBlue,
    },

    body: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 10
    },

    title: {
        fontWeight: '600',
        fontSize: 22,
        color: colors.primaryBlue,
    },

    desc: {
        fontWeight: '400',
        fontSize: 12,
        color: colors.thirdBlue,
        marginTop: 5
    },

    diet: {
        marginTop: 30,
        marginBottom: 30
    },

    multipleTitle: {
        fontWeight: '600',
        fontSize: 18,
        color: colors.primaryBlue,
        height: 35
    },

    viewDiet: {
        backgroundColor: colors.secondaryBlue,
        width: Dimensions.get('window').width * 0.3,
        height: 110,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
    },

    imageDiet: {
        width: 46,
        height: 46
    },

    textDiet: {
        fontWeight: '500',
        fontSize: 13,
        color: colors.primaryBlue,
        marginTop: 10
    },

    user: {
        marginBottom: 40
    },

    topUser: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    userPicture: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 1,
        borderColor: colors.thirdBlue,
        backgroundColor: colors.thirdBlue
    },

    username: {
        textTransform: 'capitalize',
        fontWeight: '600',
        fontSize: 18,
        color: colors.primaryBlue,
    },

    badge: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    man: {
        width: 14,
        height: 15,
        marginRight: 10
    },

    badgeText: {
        fontWeight: '500',
        fontSize: 12,
        color: colors.primaryBlue,
        lineHeight: 30
    },

    flatlistUser: {
        marginTop: 20
    },

    dot: {
        width: 4,
        height: 4,
        backgroundColor: colors.primaryBlue,
        borderRadius: 2,
        margin: 5
    },

    partEvent: {
        fontWeight: '500',
        fontSize: 12,
        color: colors.primaryBlue
    },

    placeText: {
        textTransform: 'capitalize',
        fontWeight: '500',
        fontSize: 12,
        color: colors.primaryBlue,
        lineHeight: 18,
    },

    place: {
        marginTop: 40,
        marginBottom: 90,
    },

    footer: {
        height: 95,
        width: '100%',
        position: 'absolute',
        backgroundColor: colors.white,
        bottom: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },

    date: {
        fontWeight: '600',
        fontSize: 14,
        color: colors.thirdBlue,
    },

    seats: {
        fontWeight: '400',
        fontSize: 10,
        color: colors.thirdBlue
    },

    button: {
        height: 43,
        width: 114,
        backgroundColor: colors.thirdBlue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },

    participate: {
        fontWeight: '600',
        fontSize: 14,
        color: colors.white
    }
})