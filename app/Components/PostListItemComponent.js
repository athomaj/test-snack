import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';

import { colors } from '../utils/colors';
import { BASE_URL } from '../config/config';

export function PostListItemComponent({ item, index, navigateTo }) {
    return (
        <TouchableOpacity style={{ paddingTop: index === 0 ? 20 : 0 }} onPress={navigateTo}>
            <View style={styles.container}>
                <Image style={styles.imagePost} source={{ uri: BASE_URL + item.attributes.pictures.data[0].attributes.url }} />
                <View style={styles.category}>
                    <Text style={styles.categoryText}>{item.attributes.category.data?.attributes.name}</Text>
                </View>
                <View style={styles.district}>
                    <Image style={styles.pin} source={require("../assets/icon/pin.png")} />
                    <Text style={styles.districtText}>{item.attributes.district}</Text>
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.title}>{item.attributes.title}</Text>
                    <View style={styles.userAndDate}>
                        <View style={styles.user}>
                            <Image style={styles.avatarUrl} source={{ uri: item.attributes.user.data?.attributes.avatarUrl }} />
                            <Text style={styles.userdate}>{item.attributes.user.data?.attributes.username}</Text>
                        </View>
                        <Text style={styles.userdate}>{moment((item.attributes.datetime)).format('DD MMM à H:mm')}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        marginBottom: 20,
    },

    imagePost: {
        height: 250,
        width: '100%',
        borderRadius: 8,
    },

    bottom: {
        justifyContent: 'center',
        paddingTop: 15
    },

    title: {
        fontWeight: '600',
        fontSize: 20,
        color: colors.primaryBlue,
        marginBottom: 5
    },

    avatarUrl: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 5,
        backgroundColor: colors.thirdBlue
    },

    user: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    userdate: {
        fontSize: 13,
        fontWeight: '500',
        color: colors.primaryBlue,
        marginLeft: 5
    },

    userAndDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    category: {
        position: 'absolute',
        backgroundColor: colors.whiteBlue,
        width: 63,
        height: 22,
        borderRadius: 27,
        justifyContent: 'center',
        top: 214,
        left: 11,
    },

    categoryText: {
        fontWeight: '500',
        fontSize: 11.5,
        color: colors.primaryBlue,
        textAlign: 'center',
    },

    district: {
        position: 'absolute',
        backgroundColor: colors.whiteBlue,
        width: 63,
        height: 22,
        borderRadius: 27,
        alignItems: 'center',
        justifyContent: 'center',
        top: 214,
        left: 80,
        flexDirection: 'row'
    },

    districtText: {
        fontWeight: '500',
        fontSize: 11.5,
        color: colors.primaryBlue,
        textAlign: 'center',
        padding: 3
    },

    pin: {
        width: 9,
        height: 12.5,
    }
})