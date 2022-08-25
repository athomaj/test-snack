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
import { sharedStyles } from '../utils/styles';


export function PostDetailComponent({ navigation, route }) {

    const userContext = useUserContext()
    const [participant, setParticipant] = React.useState("")
    const [post, setPost] = React.useState(null)
    const [diet, setDiet] = React.useState(null)
    const [badge, setBadge] = React.useState([{ 'id': 1, 'name': 'Super organisateur' }, { 'id': 2, 'name': 'Badge 2' }, { 'id': 3, 'name': 'Badge 3' }])
    const [bring, setBring] = React.useState([{ 'id': 1, 'name': 'Un dessert de votre choix' }, { 'id': 2, 'name': 'Une boisson non alcooliser' }, { 'id': 3, 'name': '300g de Beurre' }])
    const [info, setInfo] = React.useState([])
    const [pictureList, setPictureList] = React.useState([])
    const [carousselPitcures, setCarousselPictures] = React.useState([])

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

    function buttonStatus(text){
        if(text === 'participant'){
            return 'Se désengager';
        }
        else if(text === 'pendings'){
                return 'en attente';
        }
        else return 'Participer';
    }


    function buttonParticipateByState(){
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
                text: 'Ok',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
                },
                    ]
                );
        }
        else{
                participateToEvent()
                Alert.alert(
                    'Votre demande a été envoyé',
                    `Votre demande à bien été envoyé à ${post?.attributes.user.data.attributes.username} !`,
                    [{
                text: 'Ok',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
                },
                    ]
                );
        }
    }
    
    async function fetchData(id) {
        const response = await postApi.getOne(id)
        const responseDiet = await postApi.getDietOfOne(id)
        setPost(response)
        setDiet([...responseDiet.attributes.diets.data])
        
        if (response.attributes.moreInfo) {
            const array = []
            response.attributes.moreInfo.data.map(item => {
                array.push({id: item.id, name: item.name })
            })
            setInfo(array)
        }
        return response
    }

    const renderDiet = ({item}) => {

        return(
        <View style={styles.viewDiet}>
            <Image style={styles.imageDiet} source={{uri : BASE_URL+item.attributes.image.data.attributes.url}} />
            <Text style={styles.textDiet}>{item.attributes.name}</Text>
        </View>
    )};

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
                    <View style={styles.user}>
                        <View style={styles.topUser}>
                            <Image style={styles.userPicture} source={{ uri: post?.attributes.user.data.attributes.avatarUrl }} />
                            <View>
                                <Text style={styles.username}>{post?.attributes.user.data.attributes.username}</Text>
                                <Text style={{...sharedStyles.p, fontSize: 14}}>Organisation de <Text style={{...sharedStyles.shortText, fontSize: 14}}>5 Ateliers</Text></Text>
                                {/* <Text style={styles.partEvent}>Participation à 'undefined' évènement</Text> */}
                            </View>
                        </View>
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
                    <Text style={styles.seats}>{post?.attributes.seats-post?.attributes.participant.data.length + ' place disponible'}</Text>
                </View>
                <TouchableOpacity 
                    style={participant ? styles.buttonDelete : styles.button}
                    onPress={buttonParticipateByState}
                >
                    <Text style={styles.participate}>{buttonStatus(participant)}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.backgroundColor
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
        backgroundColor: colors.backgroundColor,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },

    top: {
        height: 375,
        width: '100%',
        backgroundColor: colors.beige1,
    },

    body: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 10
    },

    title: {
        ...sharedStyles.h1
    },

    desc: {
        ...sharedStyles.p,
        marginTop: 5,
        marginBottom: 35
    },

    diet: {
        marginTop: 30,
        marginBottom: 30
    },

    multipleTitle: {
        ...sharedStyles.h2,
        height: 35
    },

    viewDiet: {
        backgroundColor: colors.green1,
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
        color: colors.darkGreen,
        marginTop: 10
    },

    user: {
        marginBottom: 35,
        padding: 10,
        borderRadius: 4,
        backgroundColor: colors.beige1
    },

    topUser: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    userPicture: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 1,
        marginRight: 15,
        borderColor: colors.darkGreen,
        backgroundColor: colors.green1
    },

    username: {
        fontFamily: 'Syne',
        textTransform: 'capitalize',
        fontWeight: '600',
        fontSize: 22,
        color: colors.darkGreen,
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
        ...sharedStyles.p
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

    placeText: {
        ...sharedStyles.p,
        textTransform: 'capitalize',
    },

    place: {
        marginTop: 40,
        marginBottom: 90,
    },

    footer: {
        height: 95,
        width: '100%',
        position: 'absolute',
        backgroundColor: colors.backgroundColor,
        bottom: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },

    date: {
        ...sharedStyles.h3
    },

    seats: {
        ...sharedStyles.p,
        textDecorationLine: 'underline'
    },

    button: {
        height: 43,
        width: 114,
        backgroundColor: colors.orange1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },

    participate: {
        fontWeight: '600',
        fontSize: 14,
        color: colors.backgroundColor
    },
    buttonDelete:{
        height: 43,
        width: 114,
        backgroundColor: colors.green1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    }
})