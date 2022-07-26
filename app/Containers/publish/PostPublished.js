import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "../../utils/colors";

export default function PostPublished({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height: 200, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image style={styles.image} source={require('../../assets/icon/defaultImage.png')} />
            </View>
            <View style={{ width: '90%' }}>
                <Text style={styles.title}>Bravo votre{"\n"}évènements...</Text>
                <Text style={styles.text}>Super vous êtes inscrit maintenant il est temps de configurer votre profil pour avoir plus de chance de recevoir et de participer à des évènements.</Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Voir votre annonce</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.link} onPress={() => navigation.navigate('Home')}>Retour à l'accueil</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.white,
        padding: 15,
        alignItems: "center",
        justifyContent: "space-between"
    },

    image: {
        width: '50%',
        height: 120,
        resizeMode: 'contain'
    },

    title: {
        fontSize: 30,
        fontWeight: '600',
        color: colors.primaryBlue,
        textAlign: "center",
        width: '100%',
        letterSpacing: 1,
        marginBottom: 10
    },

    text: {
        fontWeight: '500',
        fontSize: 15,
        color: colors.primaryBlue,
        textAlign: "center",
        width: '100%',
        marginTop: 10,
        letterSpacing: 1,
        lineHeight: 20
    },

    button: {
        width: '90%',
        height: 43,
        backgroundColor: colors.thirdBlue,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
    },

    buttonText: {
        fontWeight: '600',
        fontSize: 14,
        color: colors.white,
    },

    link: {
        color: colors.primaryBlue,
        textDecorationLine: "underline",
        fontWeight: '500',
        fontSize: 13
    },

    footer: {
        width: '100%',
        alignItems: "center",
        justifyContent: "space-between",
        height: 80
    }
})
