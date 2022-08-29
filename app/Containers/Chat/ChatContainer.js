import React from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions, ActivityIndicator } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import { colors } from "../../utils/colors";
import { fakeMessageData } from "../../fakeData/fakeMessages";
import { fakeNotificationData } from "../../fakeData/fakeNotification";
import ChatDetailsContainer from "./ChatDetailsContainer";
import notificationApi from "../../services/notificationApi";
import chatApi from "../../services/chatApi";
import { useUserContext } from "../../context/UserContext";
import { BASE_URL } from "../../config/config";
import { isIphoneX } from "../../utils/isIphoneX";
import postApi from "../../services/postApi";
import userApi from "../../services/userApi";

const defaultNotificationPicture = require('../../assets/bell.png')

export default function ChatContainer({ navigation }) {
    const userContext = useUserContext()

    const [notification, setNotification] = React.useState(false)
    const [chatDetailsModal, setChatDetailsModal] = React.useState(false)
    
    const [chatsData, setChatsData] = React.useState([])
    const [notificationsData, setNotificationsData] = React.useState([])

    const [chatSelected, setChatSelected] = React.useState(null)

    const [loading, setLoading] = React.useState(false)

    useFocusEffect(
        React.useCallback(() => {
            fetchData()
        }, [])
    );

    async function fetchData() {
        try {
            const chatRes = await chatApi.getChats(userContext.authState.user.id)
            setChatsData(chatRes.data)
    
            const res = await notificationApi.getNotifications(userContext.authState.user.id)
            setNotificationsData(res.data)
        } catch (error) {
            console.log(error, "ERR GETTING NOTIF AND CHAT")
        }
    }

    function openChat(item) {
        setChatSelected(item)
        setChatDetailsModal(true)
    }

    function closeChat() {
        setChatDetailsModal(false);
        fetchData();
    }

    async function acceptNotification(item) {
        if (item.attributes.type === 'event') {
            try {
                setLoading(true)
                const mapUsers = item.attributes.post.data.attributes.userPendings.data.map(item => ({id: item.id}));
                const mapParticipants = item.attributes.post.data.attributes.participant.data.map(item => ({id: item.id}));

                const indexOfPending = mapUsers.findIndex(indexitem => indexitem.id === item.attributes.userRequest.data.id)

                if (indexOfPending != -1) {
                    mapUsers.splice(indexOfPending, 1)
                }

                const dataToSend = {
                    data: {
                        userPendings: mapUsers,
                        participant: [...mapParticipants, {id: item.attributes.userRequest.data.id}]
                    }
                }

                const chatRes = await chatApi.getChatUsers(item.attributes.post.data.attributes.chat.data.id)
                const arrayToUpdate = chatRes.data.attributes.users.data.flatMap((item) => ({id: item.id}))

                await postApi.update(item.attributes.post.data.id, dataToSend);
                await chatApi.update(item.attributes.post.data.attributes.chat.data.id, {
                    data: {
                        users: [...arrayToUpdate, {id: item.attributes.userRequest.data.id}]
                    },
                });
                await notificationApi.deleteNotification(item.id);

                fetchData()
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error, "ERR DECLINE SPONSOR ==========")
            }
        } else {
            try {
                setLoading(true)
                const arrayReferrals = userContext.authState.user.referrals.flatMap((referralItem) => ({id: referralItem.id}))
                const arrayPendings = userContext.authState.user.pendings.flatMap((pendingItem) => ({id: pendingItem.id}))

                const indexOf = arrayPendings.findIndex(pendingItem => pendingItem.id === item.attributes.userRequest.data.id)
                arrayPendings.splice(indexOf, 1)
                
                const res =  await userApi.updateUser({
                        referrals: [...arrayReferrals, {id: item.attributes.userRequest.data.id}],
                        pendings: arrayPendings,
                }, userContext.authState.user.id)
                // await notificationApi.deleteNotification(item.id);
                
                fetchData()
                setLoading(false)
            } catch (error) {
                console.log(error, "ACCEPT NOTIF ERR =====")
            }
        }
    }

    async function declineNotification(item) {
        try {
            setLoading(true)
            await notificationApi.deleteNotification(item.id);

            fetchData()
            setLoading(false)
        } catch (error) {
            console.log(error, "ERR DECLINE SPONSOR ==========")
        }
    }

    const renderMessage = React.useCallback(
        ({ item }) => {
        return (
            <TouchableOpacity onPress={() => openChat(item)} style={{flexDirection: 'row', marginBottom: 30, padding: 10}}>
                <Image style={styles.picture} source={{uri: BASE_URL + item.attributes.post.data.attributes.pictures.data[0].attributes.url}}/>
                <View style={{justifyContent: 'space-between', paddingBottom: 5}}>
                    <View style={{paddingLeft: 10}}>
                        <Text style={styles.name}>{item.attributes.post.data.attributes.user.data.attributes.username}</Text>
                        <Text style={styles.title}>{item.attributes.post.data.attributes.title}</Text>
                    </View>
                    {item.attributes.messages.data.length > 0 &&
                        <Text style={styles.description}>{item.attributes.messages.data[item.attributes.messages.data.length - 1].attributes.message}</Text>
                    }
                </View>
            </TouchableOpacity>
        );
        },
        [chatsData]
    );

    const renderNotification = ({ item, index }) => (
        <View style={{flexDirection: 'row', marginBottom: 30, padding: 10}}>
            {item.type != "default" ?
                <Image style={styles.picture} source={{uri: item.attributes.user.data.attributes.avatarUrl}}/>
            :
                <Image style={styles.picture} source={defaultNotificationPicture}/>
            }
            <View style={styles.containerRight}>
                <View style={{ height: '100%', justifyContent: 'space-between', paddingVertical: 2}}>
                    <Text style={{fontSize: 14, color: colors.darkGreen}}>{item.attributes.title}</Text>
                    <Text style={{fontSize: 12, width: 160, color: colors.darkGreen}}>{item.attributes.description}</Text>
                </View>
                {item.type != "default" &&
                    <View style={{height: 54, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => declineNotification(item)} style={{height: 34, width: 34, borderRadius: 17, marginRight: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white}}>
                            <Image style={{height: 15, width: 15, resizeMode: 'contain'}} source={require('../../assets/icon/cross.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => acceptNotification(item)} style={{height: 34, width: 34, borderRadius: 17, marginLeft: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2B94F'}}>
                            <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={require('../../assets/icon/validated.png')}></Image>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    )

    return (
        <SafeAreaView style={{...styles.container, backgroundColor: '#F4F3E7'}}>
            <View style={{width: '100%', height: '100%'}}>
                <View style={styles.top}>
                    <Text style={styles.h1}>Boite de réception</Text>
                </View>
                <View style={{width: '100%', alignItems: 'center'}}>
                    <View style={styles.topViewButtonContainer}>
                        <TouchableOpacity style={{ height: 34, width: 120, borderRadius: 17, justifyContent: 'center', alignItems: 'center', backgroundColor: !notification ? colors.orange1 : 'transparent'}} onPress={() => setNotification(false)}>
                            <Text style={{color: colors.darkGreen}}>Messages</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 34, width: 120, borderRadius: 17, justifyContent: 'center', alignItems: 'center', marginLeft: 10, backgroundColor: notification ? colors.orange1 : 'transparent'}} onPress={() => setNotification(true)}>
                            <Text style={{color: colors.darkGreen}}>Notifications</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={notification ? notificationsData : chatsData}
                        renderItem={notification ? renderNotification : renderMessage}
                        style={{width: '95%'}}
                        contentContainerStyle={{paddingTop: 20, paddingBottom: isIphoneX() ? 140 : 60}}
                    />
                </View>
            </View>

            {chatSelected &&
                <Modal animationType="fade" visible={chatDetailsModal} transparent={false}>
                    <ChatDetailsContainer chatId={chatSelected.id} closeModal={closeChat}></ChatDetailsContainer>
                </Modal>
            }
            {loading &&
                <View style={{position: 'absolute', top: 0, zIndex: 1,height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                    <ActivityIndicator animating={loading} color={colors.black} hidesWhenStopped={false}></ActivityIndicator>
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topViewButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 20,
        marginTop: 10
    },
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    },

    h1: {
        fontWeight: 'bold',
        fontFamily: 'Syne',
        fontSize: 30,
        color: colors.darkGreen
    },

    top: {
        marginTop: 70,
        marginLeft: 20
    },

    falseTrue: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20
    },

    isTrue: {
        width: '45%',
        height: 35,
        backgroundColor: colors.fourthBlue,
        justifyContent: "center",
        alignItems: "center"
    },

    isFalse: {
        width: '45%',
        height: 35,
        backgroundColor: colors.whiteBlue,
        justifyContent: "center",
        alignItems: "center"
    },

    textTrue: {
        fontWeight: '500',
        fontSize: 13,
        color: colors.white
    },

    flatlist: {
        width: '95%'
    },

    render: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 30
    },

    picture: {
        width: 76,
        height: 54,
        borderRadius: 4,
    },

    pictureDefault: {
        width: 54,
        height: 40,
        resizeMode: 'contain',
        marginRight: 20
    },

    name: {
        fontSize: 14,
        fontFamily: 'InterBold',
        color: colors.darkGreen
    },

    title: {
        fontWeight: 'normal',
        fontSize: 14,
        fontFamily: 'Inter',
        color: colors.darkGreen,
    },

    title2: {
        fontWeight: '500',
        fontSize: 12,
        color: colors.thirdBlue,
        width: '60%'
    },

    description: {
        fontWeight: '600',
        fontSize: 12,
        fontFamily: 'Inter',
        color: colors.darkGreen,
        paddingLeft: 10,
        marginTop: 5
    },

    typeDate: {
        fontWeight: 'bold',
        fontSize: 10,
        color: colors.fifthBlue,
        marginTop: 2
    },

    containerRight: {
        height: 54,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: (Dimensions.get('screen').width * 0.9) - 74
    },
})

