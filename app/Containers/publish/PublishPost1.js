import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../utils/colors";
import PublishFooterNav from "./Utils/PublishFooterNav";

export default function ModalPublish({ navigation }) {

    const closeModal = () => {
        navigation.navigate('Home')
    }

    return(
        <SafeAreaView>
            <ScrollView style={styles.container}>

            </ScrollView>
            <View style={styles.header}>
                <Text style={styles.titleHeader}>Création d’évènement</Text>
                <TouchableOpacity style={styles.crossView} onPress={closeModal}>
                    <Image style={styles.cross} source={require("../assets/icon/cross.png")} />
                </TouchableOpacity>
            </View>
            <PublishFooterNav disabledButton= {buttonDisable} onPressBack={navigation.goBack} onPressContinue={() => navigation.navigate('SignUpStep2')} updatecontext={() => SignUpContext.updateSignUp1(email,pass,numberPhone)}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.white
    },

    header: {
        height: 100,
        width: '100%',
        position: "absolute",
        justifyContent: "center",
        alignItems: "center"
    },

    titleHeader: {
        marginTop: 30,
        fontWeight: '500',
        fontSize: 15,
        color: colors.primaryBlue
    },

    cross: {
        width: 18,
        height: 18,
    },

    crossView: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 47,
        left: 342
    }
})