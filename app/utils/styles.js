import { Platform, StyleSheet } from "react-native";
import { colors } from '../utils/colors';
import * as Font from "expo-font";

const getFonts = () =>
  Font.loadAsync({
    Syne: require('../assets/fonts/Syne.ttf'),
    Inter: require('../assets/fonts/Inter.ttf'),
  });



export const sharedStyles = StyleSheet.create({
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
    h1: {
        fontFamily: 'Syne',
        fontWeight: '700',
        fontSize: 41,
        color: '#005DB2'
    },
    h2: {
        fontFamily: 'Syne',
        fontWeight: '600',
        fontSize: 30,
        color: 'red',
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
        backgroundColor: colors.darkGreen,
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
        fontWeight: '600', fontSize: 14, color: 'white',
    },
    shortText:{
        fontFamily: 'Inter',
        fontSize: 15,
        color: colors.darkGreen,
        fontWeight: '500',

    },
    inputText: {
        fontFamily: 'Inter',
        backgroundColor: '#E6EFF7',
        borderRadius: 4,
        height: 44,
        width: '100%',
        color: colors.darkGreen,
        fontSize: 15,
        fontWeight: '500',
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