import { Platform, StyleSheet } from "react-native";
import { colors } from '../utils/colors';
import * as Font from "expo-font";

const getFonts = () =>
  Font.loadAsync({
    Syne: require('../assets/fonts/Syne.ttf'),
    Inter: require('../assets/fonts/Inter.ttf'),
  });



export const sharedStyles = StyleSheet.create({
    wrapperHeaderSpace:{
        height: '100%',
        width: '100%',
        backgroundColor: colors.backgroundColor,
        paddingTop: '8%'
    },
    shadow: {
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5
    },
    borderBasic: {
        borderWidth: 1,
        borderColor: colors.darkGreen,
        borderRadius: 20,
        borderStyle: 'solid'
    },
    borderPublish: {
        borderWidth: 1,
        borderColor: colors.darkGreen,
        borderRadius: 20,
        borderStyle: 'solid'
    },
    bigTitle:{
        fontFamily: 'Syne',
        fontWeight: '600',
        fontSize: 30,
        color: colors.darkGreen
    },
    h1: {
        fontFamily: 'Syne',
        fontWeight: '600',
        fontSize: 25,
        lineHeight: 30,
        color: colors.darkGreen
    },
    h2: {
        fontFamily: 'Syne',
        fontWeight: '600',
        fontSize: 30,
        color: colors.darkGreen,
    },
    h3: {
        fontFamily: 'Syne',
        fontWeight: '600',
        fontSize: 18,
        color: '#005DB2',
    },
    h4: {
        fontFamily: 'Syne',
        fontWeight: '600',
        fontSize: 16,
        color: '#005DB2',
    },
    primaryButtonWithoutColor: {
        border: 1,
        height: 50,
        width: '100%',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    primaryButtonWithColor: {
        border: 1,
        height: 50,
        width: '100%',
        borderRadius: 4,
        backgroundColor: colors.orange1,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffffff',
    },
    secondaryButton: {
        border: 20,
        height: 50,
        width: '100%',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.darkGreen,
        color: colors.darkGreen,
    },
    textPublish: {
        fontFamily: 'Inter',
        fontSize: 1,
        marginBottom: 10,
        fontWeight: '500'
    },
    textUnderPrimaryButton:{
        fontFamily: 'Inter',
        fontWeight: '600', fontSize: 14,
        color: colors.darkGreen,
    },

    shortText:{
        fontFamily: 'Inter',
        fontSize: 15,
        color: colors.darkGreen,
        fontWeight: '500',

    },
    inputText: {
        fontFamily: 'Inter',
        backgroundColor: 'white',
        borderRadius: 4,
        height: 44,
        width: '100%',
        color: colors.darkGreen,
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 15,

    },
    label: {
        fontFamily: 'Inter',
        fontSize: 13,
        color: colors.darkGreen,
        fontWeight: '500',

    },
    bottomCaesura: {
        borderBottomColor: colors.darkGreen,
        borderStyle: 'solid',
        borderBottomWidth: 0.5
    },
    p:{
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 24,
        color: colors.black
    }
})

export const postCreateStyles = StyleSheet.create({
    header: {
        height: Platform.OS === 'ios' ? 80 : 100,
        width: '100%',
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white
    },

    titleHeader: {
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
        right: 20
    }
})