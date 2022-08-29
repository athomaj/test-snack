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
import { postDetailStyles } from '../styles/postDetailStyles';
import { displayAlert } from '../utils/displayAlert';
import notificationApi from '../services/notificationApi';


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
        setParticipant('')
    }

    async function participateToEvent () {
        const data = []
        userContext.authState.user.events ? userContext.authState.user?.events.forEach((element)=>{
            if(element?.id && element.id !== post.id)
            {
                data.push(element.id)
            }
        }) : null
        data.push(post.id)
        await userContext.updateUserInformation({eventPendings : data})

        await notificationApi.createNotification({
            data: {
                title: userContext.authState.user.username,
                description: `Veux participer à votre atelier "${post.attributes.title}"`,
                type: 'event',
                user: {id: post?.attributes.user.data.id},
                post: post.id,
                userRequest: {id: userContext.authState.user.id}
            }
        })

        setParticipant('pendings')
        displayAlert(
            'Votre demande a été envoyé',
            `Votre demande à bien été envoyé à ${post?.attributes.user.data.attributes.username} !`
            )
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
        }
    }
    
    async function fetchData(id) {
        const response = await postApi.getOne(id)
        setPost(response)
        setDiet([...response.attributes.diets.data])
        
        if (response.attributes.moreInfo) {
            const array = []
            response.attributes.moreInfo.data.map(item => {
                array.push({id: item.id, name: item.name })
            })
            setInfo(array)
        }
        return response
    }

    const renderDiet = ({ item }) => (
        <View style={postDetailStyles.viewDiet}>
            <Image style={postDetailStyles.imageDiet} source={require('../assets/icon/blueCarrot.png')} />
            <Text style={postDetailStyles.textDiet}>{item.attributes.name}</Text>
        </View>
    );

    return (
        <View>
            <ScrollView style={postDetailStyles.container}>
                <View style={postDetailStyles.top}>
                    {post &&
                        <Caroussel data={carousselPitcures} height={273}></Caroussel>
                    }
                    <TouchableOpacity onPress={navigation.goBack} style={postDetailStyles.backBox}>
                        <Image source={require('../assets/icon/return_icon.png')} style={{width: '80%', height:'80%', resizeMode:'contain'}}/>
                    </TouchableOpacity>
                </View>
                <View style={postDetailStyles.body}>
                    <View>
                        <Text style={postDetailStyles.title}>{post?.attributes.title}</Text>
                        <Text style={postDetailStyles.desc}>{post?.attributes.description}</Text>
                    </View>
                    <View style={postDetailStyles.diet}>
                        <Text style={postDetailStyles.multipleTitle}>Régime alimentaire</Text>
                        <FlatList
                            scrollEnabled={false}
                            data={diet}
                            numColumns={3}
                            renderItem={renderDiet}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={postDetailStyles.user}>
                        <View style={postDetailStyles.topUser}>
                            <View>
                                <Text style={postDetailStyles.username}>{post?.attributes.user.data.attributes.username}</Text>
                                <Text style={postDetailStyles.partEvent}>Votre hôte</Text>
                                {/* <Text style={postDetailStyles.partEvent}>Participation à 'undefined' évènement</Text> */}
                            </View>
                            <Image style={postDetailStyles.userPicture} source={{ uri: post?.attributes.user.data.attributes.avatarUrl }} />
                        </View>
                        <View style={postDetailStyles.flatlistUser}>
                            {badge.map((item) => (
                                <View key={item.id} style={postDetailStyles.badge}>
                                    <Image style={postDetailStyles.man} source={require('../assets/icon/man.png')} />
                                    <Text style={postDetailStyles.badgeText}>{item.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View styles={postDetailStyles.bring}>
                        <Text style={postDetailStyles.multipleTitle}>Note supplémentaire</Text>
                        <Text style={postDetailStyles.badgeText}>{post?.attributes.bonus ? post.attributes.bonus : 'Aucune'}</Text>
                        {/* {bring.map((item) => (
                            <View key={item.id} style={postDetailStyles.badge}>
                                <View style={postDetailStyles.dot} />
                                <Text style={postDetailStyles.badgeText}>{item.name}</Text>
                            </View>
                        ))} */}
                    </View>
                    <View style={postDetailStyles.place}>
                        <Text style={postDetailStyles.multipleTitle}>Lieu de rendez-vous</Text>
                        { participant === 'participant' ?
                        <>
                        <Text style={postDetailStyles.placeText}>{post?.attributes.user.data.attributes.username}</Text>
                        <Text style={postDetailStyles.placeText}>{post?.attributes.address + ', ' + '13002 Marseille'}</Text>
                        </> :
                        <Text style={postDetailStyles.placeText}>Adresse indisponnible</Text>
                        }
                        <View style={postDetailStyles.flatlistUser}>
                            {info.map((item) => (
                                <View key={item.id} style={postDetailStyles.badge}>
                                    <Image style={postDetailStyles.man} source={require('../assets/icon/man.png')} />
                                    <Text style={postDetailStyles.badgeText}>{item.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={postDetailStyles.footer}>
                <View>
                    <Text style={postDetailStyles.date}>{moment(post?.attributes.datetime).format("MMMM Do à h") + 'h'}</Text>
                    <Text style={postDetailStyles.seats}>{post?.attributes.seats + ' place disponible'}</Text>
                </View>
                <TouchableOpacity 
                    style={participant ? postDetailStyles.buttonDelete : postDetailStyles.button}
                    onPress={buttonParticipateByState}
                >
                    <Text style={postDetailStyles.participate}>{buttonStatus(participant)}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}