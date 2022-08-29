import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';

import { colors } from '../utils/colors';
import { BASE_URL } from '../config/config';

export function PostListLilItemComponent({ item, index, navigateTo }) {

    function ShortName(pseudo){
        if(pseudo.includes(' ')){
            const shortPseudo = pseudo.slice(0, pseudo.indexOf(' '))
            return shortPseudo
        }
        return pseudo
   }
    return (
        <TouchableOpacity style={{ paddingTop: index === 0 ? 20 : 0 }} onPress={navigateTo}>
            <View style={styles.container}>
                <Image style={styles.imagePost} source={{ uri: BASE_URL + item.attributes.pictures?.data[0].attributes.url }} />
                <View style={styles.right}>
                    <View>
                        <Text style={styles.title}>{item.attributes.title}</Text>
                        <Text style={styles.userdate}>{moment((item.attributes.datetime)).format('DD MMM à H:mm')}</Text>
                    </View>
                    <View style={styles.userAndDate}>
                        <Image style={styles.avatarUrl} source={{ uri: item.attributes.user.data?.attributes.avatarUrl }} />
                        <Text style={styles.userdate}>{`Avec ${ShortName(item.attributes.user.data?.attributes.username)} et ${item.attributes.participant.data.length} autres personnes`}</Text>
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
        flexDirection: 'row'
    },

    imagePost: {
        height: 76,
        width: '30%',
        borderRadius: 8,
        resizeMode: 'contain'
    },

    right: {
        height: 76,
        justifyContent: 'space-between',
        marginLeft: 15
    },

    title: {
        fontWeight: '500',
        fontSize: 14,
        color: colors.darkGreen,
        textDecorationLine: 'underline',
    },

    avatarUrl: {
        width: 27.5,
        height: 27.5,
        borderRadius: 14,
        borderWidth: 0.7,
        borderColor: colors.thirdBlue,
        marginRight: 10
    },

    user: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    userdate: {
        fontSize: 10,
        fontWeight: '500',
        color: colors.darkGreen,
        width: 120
    },

    userAndDate: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '33%'
    },

})