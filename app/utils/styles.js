import { Platform, StyleSheet } from "react-native";
import { colors } from '../utils/colors';

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
        borderColor: colors.primaryYellow,
        borderRadius: 20,
        borderStyle: 'solid'
    },
    borderPublish: {
        borderWidth: 1,
        borderColor: colors.primaryYellow,
        borderRadius: 20,
        borderStyle: 'solid'
    },
    titleH1: {
        fontWeight: 'bold',
        fontSize: 18
    },
    primaryButtonWithoutColor: {
        border: 20,
        height: 50,
        width: '80%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    primaryButtonWithColor: {
        border: 20,
        height: 50,
        width: '80%',
        borderRadius: 20,
        backgroundColor: colors.primaryYellow,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textPublish: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight: '500'
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