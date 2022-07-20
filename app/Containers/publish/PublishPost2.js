import React from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/colors";
import PublishFooterNav from "../../Components/Utils/PublishFooterNav";
import { usePublishContext } from "../../context/PublishContext";
import PostPicturePicker from "../../Components/Utils/postPicturePicker";

export default function PublishPost1({ navigation }) {

    const PublishContext = usePublishContext()
    const [buttonDisable, setButtonDisable] = React.useState(false)
    const [image, setImage] = React.useState([''])
    const [picture, setPicture] = React.useState([])

    const closeModal = () => {
        navigation.navigate('Home')
    }

    function tempImage(returnImage, index){
        if(index < 5){
            setImage([...image, index])
        }
        setPicture([...picture, returnImage])
    }

    const flatListKeyExtractor = React.useCallback((item) => "" + item.id, []);

    const renderPictures = React.useCallback(
        ({ item, index }) => <PostPicturePicker image={picture[index]?.uri} setParamImage={(returnImage) => tempImage(returnImage, index)}/>
        ,[picture]
    )

    return(
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <View style={styles.allText}>
                    <Text style={styles.text}>Choisit une photo pour l’évènement.</Text>
                    <Text style={styles.text}>Conseil pour prendre de bonne photo et rassurer... (jusqu’à 6 photos) Possibilité de le faire plus tard.</Text>
                </View>
                <View style={styles.flatlist}>
                    <FlatList
                        numColumns={3}
                        renderItem={renderPictures}
                        data={image}
                    />
                </View>
            </ScrollView>
            <View style={styles.header}>
                <Text style={styles.titleHeader}>Photo</Text>
                <TouchableOpacity style={styles.crossView} onPress={closeModal}>
                    <Image style={styles.cross} source={require("../../assets/icon/cross.png")} />
                </TouchableOpacity>
            </View>
            <PublishFooterNav disabledButton= {buttonDisable} onPressBack={navigation.goBack} onPressContinue={() => navigation.navigate('PublishPost2')} updatecontext={() => PublishContext.updatePublish2(title,desc,category)}/>
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

    header: {
        height: 100,
        width: '100%',
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white
    },

    titleHeader: {
        marginTop: 30,
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
        top: 47,
        left: 342
    },

    text: {
        fontWeight: '500',
        fontSize: 15,
        color: colors.primaryBlue,
        lineHeight: 22.5
    },

    allText: {
        marginTop: 130,
    },

    flatlist: {
        marginTop: 35,
        width: '100%'
    }
})