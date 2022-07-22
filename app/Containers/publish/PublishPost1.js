import React from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/colors";
import PublishFooterNav from "../../Components/Utils/PublishFooterNav";
import { usePublishContext } from "../../context/PublishContext";
import { dataCategory } from "../../fakeData/dataCategory";

export default function PublishPost1({ navigation }) {

    const PublishContext = usePublishContext()
    const [buttonDisable, setButtonDisable] = React.useState(false)
    const [title, setTitle] = React.useState('')
    const [desc, setDesc] = React.useState('')
    const [category, setCategory] = React.useState('')

    const closeModal = () => {
        navigation.navigate('Home')
    }

    const renderCategory = ({ item, index }) => (
        <TouchableOpacity style={styles.renderCategory} onPress={() => categoryChange(index)}>
            {item.status === true ?
            <View style={styles.viewCategoryTrue}>
                <Image style={styles.imageCategory} source={require('../../assets/icon/whiteCarrot.png')}/>
                <Text style={styles.textCategoryTrue}>{item.name}</Text>
            </View>
            :
                <View style={styles.viewCategory}>
                    <Image style={styles.imageCategory} source={require('../../assets/icon/blueCarrot.png')}/>
                    <Text style={styles.textCategory}>{item.name}</Text>
                </View>
            }
        </TouchableOpacity>
    );

    function categoryChange(index){
        const data = [...dataCategory]
        data.map(allFalse)
        data[index].status = true
        setCategory(data[index].id)
    }

    function allFalse(item){
        item.status = false
    }

    return(
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Super titre</Text>
                <Text style={styles.desc}>Texte d’introduction...</Text>
                <Text style={styles.desc}>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo...</Text>
                <Text style={styles.desc2}>Important d’avoir une photo avant de commencer !</Text>
                <View style={styles.viewFlatlist}>
                    <FlatList
                        scrollEnabled={false}
                        data={dataCategory}
                        numColumns={3}
                        renderItem={renderCategory}
                        keyExtractor={item => item.id}
                    />
                </View>
                <Text style={styles.chooseTitle}>Choisissez un titre pour l’évènements</Text>
                <View style={styles.contLilTI}>
                    <TextInput style={styles.lilTextInput} placeholder= "Titre" placeholderTextColor={colors.primaryBlue} value={title} onChangeText={(e) => setTitle(e)}/>
                </View>
                <View style={styles.contBigTI}>
                    <TextInput style={styles.bigTextInput} placeholder= "Description de l'évènement" placeholderTextColor={colors.primaryBlue} value={desc} onChangeText={(e) => setDesc(e)} multiline={true} numberOfLines={9}/>
                </View>
            </ScrollView>
            <View style={styles.header}>
                <Text style={styles.titleHeader}>Création d’évènement</Text>
                <TouchableOpacity style={styles.crossView} onPress={closeModal}>
                    <Image style={styles.cross} source={require("../../assets/icon/cross.png")} />
                </TouchableOpacity>
            </View>
            <PublishFooterNav disabledButton= {buttonDisable} onPressBack={navigation.goBack} onPressContinue={() => navigation.navigate('PublishPost2')} updatecontext={() => PublishContext.updatePublish1(title, desc, category)}/>
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

    title: {
        marginTop: 100,
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
        backgroundColor: colors.secondaryBlue,
        width: 110,
        height: 110,
        margin: 5,
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
        color: colors.primaryBlue,
        marginTop: 10
    },

    viewCategoryTrue: {
        backgroundColor: colors.thirdBlue,
        width: 110,
        height: 110,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4
    },

    textCategoryTrue: {
        fontWeight: '500',
        fontSize: 13,
        color: colors.white,
        marginTop: 10
    },

    viewFlatlist: {
        alignItems: "center",
        marginTop: 30
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