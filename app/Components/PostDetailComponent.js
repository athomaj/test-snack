import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../utils/colors';
import postApi from '../services/postApi';

export function PostDetailComponent({ navigation, route }) {

    const [post, setPost] = React.useState(null)

    async function fetchData(id){
        const response = await postApi.getOne(id)
        setPost(response)
        return response
    }

    React.useEffect(() => {
        fetchData(route.params.index)
    })

    return (
        <ScrollView style={styles.container}>
            <View style={styles.top}>
                <Image style={{width:'100%', height: '100%'}} source={{uri : post?.attributes.avatarUrl}}/>
                <TouchableOpacity style={styles.backBox}>
                    <Text style={styles.back}>{'<'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>{post?.attributes.title}</Text>
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
        backgroundColor: colors.white,
        borderRadius: 40
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