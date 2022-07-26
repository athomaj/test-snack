import React from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import PublishFooterNav from "../../Components/Utils/PublishFooterNav";
import PostPicturePicker from "../../Components/Utils/postPicturePicker";

import { usePublishContext } from "../../context/PublishContext";

import { postCreateStyles } from "../../utils/styles";
import { colors } from "../../utils/colors";

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
        ({ item, index }) => <PostPicturePicker image={picture[index]?.uri} setParamImage={(returnImage) => tempImage(returnImage, index)} />
        , [picture]
    )

    async function onPressContinue() {
        await publishContext.updatePublish2(picture)

        navigation.navigate('PublishPost3')
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={{ height: '100%', width: '100%' }}>
                <View style={{ paddingHorizontal: 10 }}>
                    <View style={styles.allText}>
                        <Text style={styles.text}>Choisit une photo pour l’évènement.</Text>
                        <Text style={styles.text}>Conseil pour prendre de bonne photo et rassurer... (jusqu’à 6 photos) Possibilité de le faire plus tard.</Text>
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
                    <Text style={postCreateStyles.titleHeader}>Photo</Text>
                    <TouchableOpacity style={postCreateStyles.crossView} onPress={() => navigation.navigate('Home')}>
                        <Image style={postCreateStyles.cross} source={require("../../assets/icon/cross.png")} />
                    </TouchableOpacity>
                </View>
                <PublishFooterNav firstScreen={false} lastScreen={false} disabledButton={buttonDisable} onPressBack={navigation.goBack} onPressContinue={onPressContinue} />
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