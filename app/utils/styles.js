import { StyleSheet } from "react-native";
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
        fontWeight: '700',
        fontSize: 41,
        color: '#005DB2'
    },
    h2: {
        fontWeight: '600',
        fontSize: 30,
        color: '#005DB2',
    },
    h3: {
        fontWeight: '600',
        fontSize: 18,
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
        backgroundColor: colors.primaryYellow,
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
        borderColor: colors.primaryYellow,
        color: colors.primaryYellow,
    },
    textPublish: {
        fontSize: 1,
        marginBottom: 10,
        fontWeight: '500'
    },
    shortText:{
        fontSize: 15,
        color: colors.primaryYellow,
        fontWeight: '500',

    },
    inputText: {
        backgroundColor: '#E6EFF7',
        borderRadius: 4,
        height: 44,
        width: '100%',
        color: colors.primaryYellow,
        fontSize: 15,
        fontWeight: '500',
        paddingHorizontal: 15,

    },
    label: {
        fontSize: 13,
        color: colors.primaryYellow,
        fontWeight: '500',

    }
})