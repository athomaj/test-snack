import React from "react";
import { Image, Keyboard, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import PublishFooterNav from "../../Components/Utils/PublishFooterNav";

import { usePublishContext } from "../../context/PublishContext";

import { dataCategory } from "../../fakeData/dataCategory";

import { postCreateStyles } from "../../utils/styles";
import { colors } from "../../utils/colors";

const categorySelectedPicture = require('../../assets/icon/blueCarrot.png')
const categoryUnselectedPicture = require('../../assets/icon/whiteCarrot.png')

export default function PublishPost1({ navigation }) {

    const publishContext = usePublishContext()

    const [buttonDisable, setButtonDisable] = React.useState(false)
    const [title, setTitle] = React.useState('')
    const [desc, setDesc] = React.useState('')
    const [category, setCategory] = React.useState(0)

    const textInput2Ref = React.useRef(null)

    async function onPressContinue() {
        await publishContext.updatePublish1(title, desc, category + 1)

        navigation.navigate('PublishPost2')
    }

    return (
        <SafeAreaView style={{ height: '100%', flex: 1, backgroundColor: 'white' }}>
            <View style={{ height: '100%', width: '100%', backgroundColor: colors.white }}>
                <KeyboardAwareScrollView keyboardDismissMode="on-drag" style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flex: 1, paddingHorizontal: 10 }}>
                            <Text style={styles.title}>Super titre</Text>
                            <Text style={styles.desc}>Texte d’introduction...</Text>
                            <Text style={styles.desc}>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo...</Text>
                            <Text style={styles.desc2}>Important d’avoir une photo avant de commencer !</Text>
                            <View style={styles.categoryViewContainer}>
                                {dataCategory.map((item, index) => (
                                    <TouchableOpacity key={item.id} style={{ width: '32%' }} onPress={() => setCategory(index)}>
                                        <View style={{ ...styles.viewCategory, backgroundColor: category === index ? colors.thirdBlue : colors.secondaryBlue }}>
                                            <Image style={styles.imageCategory} source={category != index ? categorySelectedPicture : categoryUnselectedPicture} />
                                            <Text style={{ ...styles.textCategory, color: category === index ? colors.white : colors.primaryBlue }}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                                }
                            </View>
                            <Text style={styles.chooseTitle}>Choisissez un titre pour l’évènements</Text>
                            <View style={styles.contLilTI}>
                                <TextInput returnKeyType="next" onSubmitEditing={() => textInput2Ref.current?.focus()} blurOnSubmit={false} style={styles.lilTextInput} placeholder="Titre" placeholderTextColor={colors.primaryBlue} value={title} onChangeText={(e) => setTitle(e)} />
                            </View>
                            <View style={styles.contBigTI}>
                                <TextInput ref={textInput2Ref} style={styles.bigTextInput} placeholder="Description de l'évènement" placeholderTextColor={colors.primaryBlue} value={desc} onChangeText={(e) => setDesc(e)} multiline={true} numberOfLines={9} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
                <View style={postCreateStyles.header}>
                    <Text style={postCreateStyles.titleHeader}>Création d’évènement</Text>
                    <TouchableOpacity style={postCreateStyles.crossView} onPress={() => navigation.navigate('Home')}>
                        <Image style={postCreateStyles.cross} source={require("../../assets/icon/cross.png")} />
                    </TouchableOpacity>
                </View>
                <PublishFooterNav firstScreen={true} lastScreen={false} disabledButton={buttonDisable} onPressBack={navigation.goBack} onPressContinue={onPressContinue} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.white,
        padding: 15
    },

    title: {
        marginTop: Platform.OS === 'ios' ? 80 : 100,
        fontWeight: '600',
        fontSize: 22,
        color: colors.primaryBlue,
        marginBottom: 10
    },

    desc: {
        fontWeight: '400',
        fontSize: 12,
        color: colors.thirdBlue,
    },

    desc2: {
        fontWeight: '700',
        fontSize: 12,
        color: colors.thirdBlue,
    },

    viewCategory: {
        width: "100%",
        height: 110,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4
    },

    imageCategory: {
        width: 46,
        height: 46
    },

    textCategory: {
        fontWeight: '500',
        fontSize: 13,
        marginTop: 10
    },

    categoryViewContainer: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: 'row',
        marginTop: 30,
        width: '100%'
    },

    chooseTitle: {
        marginTop: 30,
        fontWeight: '500',
        fontSize: 15,
        color: colors.primaryBlue
    },

    lilTextInput: {
        width: '100%',
        height: 44,
        backgroundColor: colors.secondaryBlue,
        borderRadius: 4,
        padding: 10
    },

    contLilTI: {
        height: 70,
        justifyContent: "center"
    },

    bigTextInput: {
        width: '100%',
        height: 179,
        backgroundColor: colors.secondaryBlue,
        borderRadius: 4,
        padding: 10,
        textAlignVertical: 'top',
    },

    contBigTI: {
        height: 200,
        justifyContent: "center"
    }
})