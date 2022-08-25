import React from "react";
import { Image, Keyboard, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PublishFooterNav from "../../Components/Utils/PublishFooterNav";
import { usePublishContext } from "../../context/PublishContext";
import { dataCategory } from "../../fakeData/dataCategory";
import { postCreateStyles, sharedStyles } from "../../utils/styles";
import { colors } from "../../utils/colors";
import { TextAreaComponent } from "../../Components/Utils/TextAreaComponent";
import SignupFooterNav from "../../Components/Utils/SignupFooterNav";

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
        <SafeAreaView style={{ height: '100%', flex: 1, backgroundColor: colors.backgroundColor }}>
            <View style={{...sharedStyles.wrapperHeaderSpace}}>
                <KeyboardAwareScrollView keyboardDismissMode="on-drag" style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flex: 1, paddingHorizontal: 10 }}>
                            <Text style={styles.title}>C’est parti !</Text>
                            <Text style={{...sharedStyles.p}}>Que souhaites-tu proposer sur Food Food?</Text>
                            <View style={styles.categoryViewContainer}>
                                {dataCategory.map((item, index) => (
                                    <TouchableOpacity key={item.id} style={{ width: '32%' }} onPress={() => setCategory(index)}>
                                        <View style={{ ...styles.viewCategory, backgroundColor: category === index ? colors.orange1 : colors.green1 }}>
                                            <Image style={styles.imageCategory} source={category != index ? categorySelectedPicture : categoryUnselectedPicture} />
                                            <Text style={{ ...styles.textCategory, color: category === index ? 'black' : colors.darkGreen }}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                                }
                            </View>
                            <View style={styles.contLilTI}>
                                <TextInput returnKeyType="next" onSubmitEditing={() => textInput2Ref.current?.focus()} blurOnSubmit={false} style={{...sharedStyles.inputText}} placeholder="Titre de l’événement..." placeholderTextColor={colors.darkGreen} value={title} onChangeText={(e) => setTitle(e)} />
                            </View>
                            <View style={styles.contBigTI}>
                                <TextInput ref={textInput2Ref} style={styles.bigTextInput} placeholder="Description de l'évènement" placeholderTextColor={colors.green1} value={desc} onChangeText={(e) => setDesc(e)} multiline={true} numberOfLines={9} />
                                <Text style={{...sharedStyles.shortText, color: colors.green1,position: 'absolute', bottom: 15, right: 10}}>250</Text>
                                { !desc &&
                                    <Text style={{...sharedStyles.shortText, position: "absolute", top: 35, left: 10}}>De quoi s’agit-il en quelques mots</Text>
                                }
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
                {/* <PublishFooterNav firstScreen={true} lastScreen={false} disabledButton={buttonDisable}  /> */}
                <SignupFooterNav
                    onPressContinue={onPressContinue}
                    onPressBack={navigation.goBack}
                    disabledButton={buttonDisable}
                    canGoBack= {true}
                    title= "Suivant"

                ></SignupFooterNav>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        ...sharedStyles.wrapperHeaderSpace,
        padding: 15
    },

    title: {
        ...sharedStyles.bigTitle,
        marginTop: Platform.OS === 'ios' ? 80 : 100,
        marginBottom: 10
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

    contLilTI: {
        height: 70,
        justifyContent: "center"
    },

    bigTextInput: {
        width: '100%',
        height: 179,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 10,
        textAlignVertical: 'top',
    },

    contBigTI: {
        height: 200,
        justifyContent: "center"
    }
})