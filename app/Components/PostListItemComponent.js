import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';

import { colors } from '../utils/colors';

export function PostListItemComponent({ item, index}) {
    return (
        <View style={{ paddingTop: index === 0 ? 20 : 0 }}>
            <View style={styles.container}>
                <Image style={styles.imagePost} source={{uri: item.attributes.avatarUrl}}></Image>
                <View style={styles.bottom}>
                    <Text style={styles.title}>{item.attributes.title}</Text>
                    <View style={styles.userAndDate}>
                        <View style={styles.user}>
                            <View style={styles.sizeAvatar}>
                                <Image style={styles.avatarUrl} source={{uri: item.attributes.user.data.attributes.avatarUrl}}></Image>
                            </View>
                            <Text style={styles.userdate}>{item.attributes.user.data.attributes.username}</Text>
                        </View>
                        <Text style={styles.userdate}>{moment((item.attributes.date)).format('DD MMM à H:mm')}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        height: 315,
        width: '100%',
        marginBottom: 20,
    },

    imagePost: {
        height: 250,
        width: '100%',
        borderRadius: 8,
    },

    bottom: {
        height: 65,
        justifyContent: 'center',
    },

    title: {
        height: 40,
        fontWeight: '600',
        fontSize: 20,
        color: colors.primaryBlue,
    },

    avatarUrl: {
        width: 21,
        height: 21,
        borderRadius: 21,
    },

    user: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    userdate: {
        fontSize: 13,
        fontWeight: '500',
        color: colors.primaryBlue,
    },

    userAndDate: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    sizeAvatar: {
        width: 25,
    }
})