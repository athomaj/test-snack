import React from "react";
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/colors";
import { fakeMessageData } from "../../fakeData/fakeMessages";
import { fakeNotificationData } from "../../fakeData/fakeNotification";
import { isIphoneX } from "../../utils/isIphoneX";

export default function ChatDetailsContainer({ closeModal }) {

    const [notification, setNotification] = React.useState(false)

    const renderMessage = ({ item, index }) => (
        <View style={{flexDirection: 'row', width: Dimensions.get('screen').width, backgroundColor: 'red', paddingHorizontal: 10, marginBottom: 10}}>
            <Image style={styles.picture} source={{uri: item.picture}}/>
            <View style={{width: '75%', backgroundColor: 'yellow'}}>
                <Text style={styles.title2}>
                    Sarah R. (Hôte)
                    <Text style={{fontSize: 12}}>
                        {' 12:00'}
                    </Text>
                </Text>
                <Text style={styles.typeDate}>{'Il y a ' + item.date + ' jours'}</Text>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: '10%'}}>
                    <View style={{height: 70, width: '25%', justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{height: 50, width: '90%', resizeMode: 'cover'}} source={require('../../assets/image.png')}/>
                    </View>
                    <View style={{width: '75%'}}>
                        <TouchableOpacity>
                            <Text style={{textDecorationLine: 'underline'}}>Atler prépration dinde</Text>
                        </TouchableOpacity>
                        <Text>11 Juillet 2022</Text>
                    </View>
                    <TouchableOpacity onPress={closeModal} style={{position: 'absolute',left: 0, height:40, width: 40, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={require('../../assets/exitModal.png')}></Image>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={fakeNotificationData}
                    renderItem={renderMessage}
                    contentContainerStyle={{paddingTop: 20, backgroundColor: 'green'}}
                />
                <View style={{position: 'absolute', bottom: 10, flexDirection: 'row', width: Dimensions.get('screen').width, paddingHorizontal: 10}}>
                    <TextInput style={{ height: 40, width: '85%', paddingHorizontal: 15, borderRadius: 5, backgroundColor: 'white'}} placeholderTextColor="#00473C" placeholder="Ecrire un message"></TextInput>
                    <View style={{height: 40, width: '15%', alignItems: 'flex-end'}}>
                        <TouchableOpacity style={{height:40, width: 40, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E2AE4E'}}>
                            <Image style={{height:15, width: 30, resizeMode: 'contain'}} source={require('../../assets/icon/sendMessage.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F3E7'
    },

    h1: {
        fontWeight: '600',
        fontSize: 18,
        color: colors.primaryBlue
    },

    top: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
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
        marginLeft: 20,
        marginTop: 30
    },

    render: {
        flexDirection: "row",
        marginBottom: 30
    },

    picture: {
        width: 54,
        height: 54,
        borderRadius: 27,
        borderWidth: 1.6,
        borderColor: colors.thirdBlue,
        marginRight: 10
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
        fontSize: 14,
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
        marginTop: 5
    },

    containerRight: {
        justifyContent: "center"
    },
})

