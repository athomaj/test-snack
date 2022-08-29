import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { isIphoneX } from "../utils/isIphoneX";

export const postDetailStyles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.white
    },

    back: {
        fontWeight: '500',
        fontSize: 22,
        color: colors.primaryBlue,
    },

    backBox: {
        position: 'absolute',
        top: isIphoneX() ? 60 : 30,
        left: 20,
        height: 25,
        width: 25,
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },

    top: {
        height: 375,
        width: '100%',
        backgroundColor: colors.backBlue,
    },

    body: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 10
    },

    title: {
        fontWeight: '600',
        fontSize: 22,
        color: colors.primaryBlue,
    },

    desc: {
        fontWeight: '400',
        fontSize: 12,
        color: colors.thirdBlue,
        marginTop: 5
    },

    diet: {
        marginTop: 30,
        marginBottom: 30
    },

    multipleTitle: {
        fontWeight: '600',
        fontSize: 18,
        color: colors.primaryBlue,
        height: 35
    },

    viewDiet: {
        backgroundColor: colors.secondaryBlue,
        width: Dimensions.get('window').width * 0.3,
        height: 110,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
    },

    imageDiet: {
        width: 46,
        height: 46
    },

    textDiet: {
        fontWeight: '500',
        fontSize: 13,
        color: colors.primaryBlue,
        marginTop: 10
    },

    user: {
        marginBottom: 40
    },

    topUser: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    userPicture: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 1,
        borderColor: colors.thirdBlue,
        backgroundColor: colors.thirdBlue
    },

    username: {
        textTransform: 'capitalize',
        fontWeight: '600',
        fontSize: 18,
        color: colors.primaryBlue,
    },

    badge: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    man: {
        width: 14,
        height: 15,
        marginRight: 10
    },

    badgeText: {
        fontWeight: '500',
        fontSize: 12,
        color: colors.primaryBlue,
        lineHeight: 30
    },

    flatlistUser: {
        marginTop: 20
    },

    dot: {
        width: 4,
        height: 4,
        backgroundColor: colors.primaryBlue,
        borderRadius: 2,
        margin: 5
    },

    partEvent: {
        fontWeight: '500',
        fontSize: 12,
        color: colors.primaryBlue
    },

    placeText: {
        textTransform: 'capitalize',
        fontWeight: '500',
        fontSize: 12,
        color: colors.primaryBlue,
        lineHeight: 18,
    },

    place: {
        marginTop: 40,
        marginBottom: 90,
    },

    footer: {
        height: 95,
        width: '100%',
        position: 'absolute',
        backgroundColor: colors.white,
        bottom: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },

    date: {
        fontWeight: '600',
        fontSize: 14,
        color: colors.thirdBlue,
    },

    seats: {
        fontWeight: '400',
        fontSize: 10,
        color: colors.thirdBlue
    },

    button: {
        height: 43,
        width: 114,
        backgroundColor: colors.thirdBlue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },

    participate: {
        fontWeight: '600',
        fontSize: 14,
        color: colors.white
    },
    buttonDelete:{
        height: 43,
        width: 114,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    }
})