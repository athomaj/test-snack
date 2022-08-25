import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/colors";
import { sharedStyles } from "../../utils/styles";

export default function PostPublished({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height: '60%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image style={styles.image} source={require('../../assets/onboarding/pictureOnboarding.png')} />
            </View>
            <View style={{ width: '90%', justifyContent: 'flex-end', marginBottom: 40}}>
                <Text style={{...sharedStyles.bigTitle}}>C’est en ligne...</Text>
                <Text style={{...sharedStyles.p}}>Super ton annonce est maintenant visible par la communauté Food Food. Surveille tes messages pour répondre aux demandes...</Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={{...sharedStyles.primaryButtonWithColor}}>
                    <Text style={{...sharedStyles.textUnderPrimaryButton}}>Voir votre annonce</Text>
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
        ...sharedStyles.wrapperHeaderSpace,
        padding: 15,
        alignItems: "center",
        justifyContent: "flex-end"
    },

    image: {
        width: '100%',
        height: '90%',
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
        color: colors.darkGreen,
        textDecorationLine: "underline",
        fontWeight: '500',
        fontSize: 13
    },

    footer: {
        paddingHorizontal: 15,
        marginBottom: 30,
        width: '100%',
        alignItems: "center",
        justifyContent: "space-between",
        height: 80
    }
})
