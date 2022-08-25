import React from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import PublishFooterNav from "../../Components/Utils/PublishFooterNav";
import PostPicturePickerComponent from "../../Components/Utils/PostPicturePickerComponent";

import { usePublishContext } from "../../context/PublishContext";

import { postCreateStyles, sharedStyles } from "../../utils/styles";
import { colors } from "../../utils/colors";
import SignupFooterNav from "../../Components/Utils/SignupFooterNav";

export default function PublishPost2({ navigation }) {

    const publishContext = usePublishContext()

    const [buttonDisable, setButtonDisable] = React.useState(false)
    const [image, setImage] = React.useState([''])
    const [picture, setPicture] = React.useState([])

    function tempImage(returnImage, index) {
        if (index < 5) {
            setImage([...image, index])
        }
        setPicture([...picture, returnImage])
    }

    const flatListKeyExtractor = React.useCallback((item) => "" + item.id, []);

    const renderPictures = React.useCallback(
        ({ item, index }) => <PostPicturePickerComponent image={picture[index]?.uri} setParamImage={(returnImage) => tempImage(returnImage, index)} />
        , [picture]
    )

    async function onPressContinue() {
        await publishContext.updatePublish2(picture)

        navigation.navigate('PublishPost3')
    }

    return (
        <SafeAreaView style={{ backgroundColor: colors.backgroundColor }}>
            <View style={{ height: '100%', width: '100%' }}>
                <View style={{ paddingHorizontal: 10 }}>
                    <View style={styles.allText}>
                    <Text style={{...sharedStyles.bigTitle, marginBottom: 5}}>Photo</Text>
                        <Text style={{...sharedStyles.p}}>Choisis une ou plusieurs photos pour illustrer ce que tu proposes. </Text>
                        <Text style={{...sharedStyles.p}}>Voir nos conseils pour réussir ta photo.</Text>
                    </View>
                    <View style={styles.flatlist}>
                        <FlatList
                            numColumns={3}
                            renderItem={renderPictures}
                            data={image}
                            keyExtractor={flatListKeyExtractor}
                        />
                    </View>
                </View>
                <View style={postCreateStyles.header}>
                    <TouchableOpacity style={postCreateStyles.crossView} onPress={() => navigation.navigate('Home')}>
                        <Image style={postCreateStyles.cross} source={require("../../assets/icon/cross.png")} />
                    </TouchableOpacity>
                </View>
                {/* <PublishFooterNav firstScreen={false} lastScreen={false} disabledButton={buttonDisable} onPressBack={navigation.goBack} onPressContinue={onPressContinue} /> */}
                <SignupFooterNav
                disabledButton={buttonDisable}
                title="Suivant"
                onPressBack={navigation.goBack}
                onPressContinue={onPressContinue}
                canGoBack = {true}
                ></SignupFooterNav>
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

    text: {
        fontWeight: '500',
        fontSize: 15,
        color: colors.primaryBlue,
        lineHeight: 22.5
    },

    allText: {
        marginTop: Platform.OS === 'ios' ? 80 : 100,
    },

    flatlist: {
        marginTop: 35,
        width: '100%'
    }
})