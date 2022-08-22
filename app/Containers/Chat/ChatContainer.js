import React from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import { colors } from "../../utils/colors";
import { fakeMessageData } from "../../fakeData/fakeMessages";
import { fakeNotificationData } from "../../fakeData/fakeNotification";
import ChatDetailsContainer from "./ChatDetailsContainer";
import notificationService from "../../services/notificationService";

const defaultNotificationPicture = require('../../assets/bell.png')

export default function ChatContainer({ navigation }) {

    const [notification, setNotification] = React.useState(false)
    const [chatDetailsModal, setChatDetailsModal] = React.useState(false)
    const [notificationsData, setNotificationsData] = React.useState([])

    useFocusEffect(
        React.useCallback(() => {
            fetchData()
        }, [])
    );

    async function fetchData() {
        const res = await notificationService.getNotifications()
        setNotificationsData(res)
    }

    const renderMessage = ({ item, index }) => (
        <TouchableOpacity onPress={openChatDetails} style={{flexDirection: 'row', marginBottom: 30}}>
            <Image style={styles.picture} source={{uri: item.picture}}/>
            <View style={{justifyContent: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.title}>{' - ' +item.title}</Text>
                </View>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.typeDate}>{item.type + ' - ' + item.date}</Text>
            </View>
        </TouchableOpacity>
    )

    const renderNotification = ({ item, index }) => (
        <View style={styles.render}>
            {item.type != "default" ?
                <Image style={styles.picture} source={{uri: item.users_permissions_user.avatarUrl}}/>
            :
                <Image style={styles.pictureDefault} source={defaultNotificationPicture}/>
            }
            <View style={styles.containerRight}>
                <View style={{paddingTop: 5}}>
                    <Text style={styles.title2}>{item.title}</Text>
                    <Text style={styles.typeDate}>{item.description}</Text>
                </View>
                {item.type != "default" &&
                    <View style={{height: 54, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style={{height: 34, width: 34, borderRadius: 17, marginRight: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white}}>
                            <Image style={{height: 15, width: 15, resizeMode: 'contain'}} source={require('../../assets/icon/cross.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height: 34, width: 34, borderRadius: 17, marginLeft: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2B94F'}}>
                            <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={require('../../assets/icon/validated.png')}></Image>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    )

    function openChatDetails() {
        setChatDetailsModal(!chatDetailsModal)
    }

    return (
        <SafeAreaView style={{...styles.container, backgroundColor: '#F4F3E7'}}>
            <View style={{width: '100%', height: '100%'}}>
                <View style={styles.top}>
                    <Text style={styles.h1}>Boite de réception</Text>
                </View>
                {notification === false ?
                <View style={{width: '100%', alignItems: 'center'}}>
                    <View style={styles.falseTrue}>
                        <View style={styles.isTrue}>
                            <Text style={styles.textTrue}>Message</Text>
                        </View>
                        <TouchableOpacity style={styles.isFalse} onPress={() => setNotification(true)}>
                            <Text style={styles.textFalse}>Notification</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.flatlist}>
                        <FlatList
                            data={fakeMessageData}
                            renderItem={renderMessage}
                        />
                    </View>
                </View>
                :
                <View style={{width: '100%', alignItems: 'center'}}>
                    <View style={styles.falseTrue}>
                        <TouchableOpacity style={styles.isFalse} onPress={() => setNotification(false)}>
                            <Text style={styles.textFalse}>Message</Text>
                        </TouchableOpacity>
                        <View style={styles.isTrue}>
                            <Text style={styles.textTrue}>Notification</Text>
                        </View>
                    </View>
                    <View style={styles.flatlist}>
                        <FlatList
                            data={notificationsData}
                            renderItem={renderNotification}
                        />
                    </View>
                </View>
                }
            </View>

            <Modal animationType="fade" visible={chatDetailsModal} transparent={false}>
                <ChatDetailsContainer closeModal={() => setChatDetailsModal(false)}></ChatDetailsContainer>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    },

    h1: {
        fontWeight: '600',
        fontSize: 30,
        color: colors.primaryBlue
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
        width: '95%',
        marginTop: 30
    },

    render: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 30
    },

    picture: {
        width: 54,
        height: 54,
        borderRadius: 27,
        borderWidth: 1.6,
        borderColor: colors.thirdBlue,
        marginRight: 20
    },

    pictureDefault: {
        width: 54,
        height: 40,
        resizeMode: 'contain',
        marginRight: 20
    },

    name: {
        fontWeight: '700',
        fontSize: 12,
        color: colors.thirdBlue
    },

    title: {
        fontWeight: '500',
        fontSize: 12,
        color: colors.thirdBlue,
    },

    title2: {
        fontWeight: '500',
        fontSize: 12,
        color: colors.thirdBlue,
        width: '60%'
    },

    description: {
        fontWeight: '600',
        fontSize: 10,
        color: colors.thirdBlue
    },

    typeDate: {
        fontWeight: '500',
        fontSize: 10,
        color: colors.fifthBlue,
        marginTop: 2
    },

    containerRight: {
        height: 54,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: (Dimensions.get('screen').width * 0.95) - 74
    },
})

