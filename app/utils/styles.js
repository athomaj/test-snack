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
    }
})

export const primaryButton = StyleSheet.create({
    avalable:{
        border: 20,
        height: 50,
        width: '80%',
        borderRadius: 20,
        backgroundColor: colors.primaryYellow,
        justifyContent: 'center',
        alignItems: 'center'
    },
    disabled:{
        border: 20,
        height: 50,
        width: '80%',
        borderRadius: 20,
        backgroundColor: colors.primaryYellow,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5
    }
})

export const title = StyleSheet.create({
    h1:{
    fontWeight : 'bold',
    fontSize: 18
    }
})