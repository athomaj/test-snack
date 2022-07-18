import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';

import { colors } from '../utils/colors';
import { sharedStyles } from '../utils/styles';

export function PostDetailComponent({ navigation, route }) {

    const index = route.params.index

    return (
        <ScrollView style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity style={styles.backBox}>
                    <Text style={styles.back}>{'<'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>{}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%'
    },

    back: {
        fontWeight: '500',
        fontSize: 22,
        color: colors.primaryBlue,
    },

    backBox: {
        position: 'absolute',
        top: 60,
        left: 20,
        height: 30,
        width: 30,
        alignItems: 'center',
    },

    top: {
        height: 375,
        width: '100%',
        backgroundColor: colors.backBlue,
    },


    body: {
        padding: '5%'
    },

    title: {
        fontWeight: '600',
        fontSize: 22,
        color: colors.primaryBlue
    }
})