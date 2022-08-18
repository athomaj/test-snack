import React from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { colors } from '../utils/colors';
import postApi from '../services/postApi';
import moment from 'moment';
import { isIphoneX } from '../utils/isIphoneX';
import { useUserContext } from '../context/UserContext';
import { onBoardingData } from '../utils/onBoardingData';
import Caroussel from './Utils/Caroussel';
import { BASE_URL } from '../config/config';


export function PostDetailComponent({ navigation, route }) {

    const userContext = useUserContext()
    const [participant, setParticipant] = React.useState(false)
    const [post, setPost] = React.useState(null)
    const [diet, setDiet] = React.useState(null)
    const [badge, setBadge] = React.useState([{ 'id': 1, 'name': 'Super organisateur' }, { 'id': 2, 'name': 'Badge 2' }, { 'id': 3, 'name': 'Badge 3' }])
    const [bring, setBring] = React.useState([{ 'id': 1, 'name': 'Un dessert de votre choix' }, { 'id': 2, 'name': 'Une boisson non alcooliser' }, { 'id': 3, 'name': '300g de Beurre' }])
    const [info, setInfo] = React.useState([{ 'id': 1, 'name': 'Animaux de compagnie' }, { 'id': 2, 'name': 'Non fumeur' }, { 'id': 3, 'name': 'Place de parking sur place' }])
    const [pictureList, setPictureList] = React.useState([])
    const [carousselPitcures, setCarousselPictures] = React.useState([])

    async function fetchData(id) {
        const response = await postApi.getOne(id)
        setPost(response)
        const doubleDier = [...response.attributes.diets.data]
        // doubleDier.concat(response.attributes.diets.data)
        console.log(response.attributes.user)
        setDiet(doubleDier)
        return response
    }

    React.useEffect(() => {
        fetchData(route.params.index)
    }, [])

    React.useEffect(()=>{
       //post ? console.log('MY POST ______________________________________________>',post.attributes.pictures.data) : null
       if(post){
        let idOfpicture = -1;
        const listOfpictures = post?.attributes.pictures.data.map((element) => {
            idOfpicture++
            return {id: idOfpicture,image: BASE_URL+element.attributes.url}
        })
        setCarousselPictures(listOfpictures)
         }
       post?.attributes.participant.data.forEach((element)=>{
        if(element.id ===  userContext.authState.user.id){
            setParticipant('participant')
        }
        })
        post?.attributes.userPendings.data.forEach((element)=>{
            if(element.id ===  userContext.authState.user.id){
                setParticipant('pendings')
            }
            })
    },[post])

    const abandonEvent = async ()=>{
        const data = []
        const listOfEvent = userContext.authState.user.events.forEach((element)=>{
            if(element.id !== post.id)
            {
                data.push(element.id)
            }
        })
        const abadonState = await userContext.updateUserInformation({events : data})
        setParticipant(false)
    }

    const participateToEvent = ()=>{
        const data = []
        userContext.authState.user.events ? userContext.authState.user?.events.forEach((element)=>{
            if(element?.id && element.id !== post.id)
            {
                data.push(element.id)
            }
        }) : null
        data.push(post.id)
        userContext.updateUserInformation({eventPendings : data})
        setParticipant(true)
    }

    function buttonStatus(){
        if(participant === 'participant'){
            return 'Se désengager';
        }
        else if(participant === 'pendings'){
                return 'en attente';
        }
        else return 'Participer';
    }

    // Change DATA by data Post
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
                        <Caroussel data={carousselPitcures} height={273}></Caroussel>
                    }
                    <TouchableOpacity onPress={navigation.goBack} style={styles.backBox}>
                        <Image source={require('../assets/icon/return_icon.png')} style={{width: '80%', height:'80%', resizeMode:'contain'}}/>
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
                                <Text style={styles.username}>{post?.attributes.user?.data.attributes.username}</Text>
                                <Text style={styles.partEvent}>Participation à 'undefined' évènement</Text>
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
                        <Text style={styles.multipleTitle}>Note supplémentaire</Text>
                        <Text style={styles.badgeText}>{post?.attributes.bonus ? post.attributes.bonus : 'Aucune'}</Text>
                        {/* {bring.map((item) => (
                            <View key={item.id} style={styles.badge}>
                                <View style={styles.dot} />
                                <Text style={styles.badgeText}>{item.name}</Text>
                            </View>
                        ))} */}
                    </View>
                    <View style={styles.place}>
                        <Text style={styles.multipleTitle}>Lieu de rendez-vous</Text>
                        { participant === 'participant' ?
                        <>
                        <Text style={styles.placeText}>{post?.attributes.user.data.attributes.username}</Text>
                        <Text style={styles.placeText}>{post?.attributes.address + ', ' + post?.attributes.district}</Text>
                        </> :
                        <Text style={styles.placeText}>Adresse indisponnible</Text>
                        }
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
                <TouchableOpacity style={participant ? styles.buttonDelete : styles.button}
                onPress={() => {
                    if(participant === 'participant'){
                        Alert.alert(
                            'Se désengager', 
                            "Vous êtes sur le point de vous désengager à l'évênnment. Votre place ne seras plus idsponnible êtes vous sur de vouloir vous désengagez ?",
                            [{
                            text: 'Se désengager',
                            onPress: () => abandonEvent()
                            },
                            {
                                text: 'Annulé',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            ],
                        )
                    }
                    else if(participant === 'pendings')
                    {
                        Alert.alert(
                            'Votre demande est en attente',
                            'Vous serrez informé de votre acceptation bientôt',
                            [{
                        text: 'Annulé',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                        },
                            ]
                        );
                    }
                    else participateToEvent()
                        }}
                >
                    <Text style={styles.participate}>{
                        buttonStatus()}</Text>
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
        top: isIphoneX() ? 60 : 30,
        left: 20,
        height: 25,
        width: 25,
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
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
    },
    buttonDelete:{
        height: 43,
        width: 114,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    }
})