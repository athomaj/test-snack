import React from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/colors";
import { fakeMessageData } from "../../fakeData/fakeMessages";
import { fakeNotificationData } from "../../fakeData/fakeNotification";
import { isIphoneX } from "../../utils/isIphoneX";

export default function ChatDetailsContainer({ navigation }) {

    const [notification, setNotification] = React.useState(false)

    const renderMessage = ({ item, index }) => (
        <View style={styles.render}>
            <Image style={styles.picture} source={{uri: item.picture}}/>
            <View style={styles.containerRight}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.title}>{' - ' +item.title}</Text>
                </View>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.typeDate}>{item.type + ' - ' + item.date}</Text>
            </View>
        </View>
    )

    const renderNotification = ({ item, index }) => (
        <View style={styles.render}>
            <Image style={styles.picture} source={{uri: item.picture}}/>
            <View style={styles.containerRight}>
                <Text style={styles.title2}>{'Hey ' + item.name + ' vous demande de le/la parrainer. Le/La recommendez-vous ?'}</Text>
                <Text style={styles.typeDate}>{'Il y a ' + item.date + ' jours'}</Text>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={{width: '100%', height: '100%'}}>
                <View style={styles.top}>
                    <Text style={styles.h1}>Chat Details</Text>
                    <TouchableOpacity style={{position: 'absolute',right: 0, height: 50, width: 50, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={require('../../assets/exitModal.png')}></Image>
                    </TouchableOpacity>
                </View>
                {notification === false ?
                <View>
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
                <View>
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
                            data={fakeNotificationData}
                            renderItem={renderNotification}
                        />
                    </View>
                </View>
                }
            </View>
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
        fontSize: 18,
        color: colors.primaryBlue
    },

    top: {
        paddingTop: isIphoneX() ? 40 : 20,
        paddingHorizontal: 20,
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
        marginTop: 5
    },

    containerRight: {
        justifyContent: "center"
    },
})

