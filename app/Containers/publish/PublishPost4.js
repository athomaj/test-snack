import React from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import PublishFooterNav from "../../Components/Utils/PublishFooterNav";

import { usePublishContext } from "../../context/PublishContext";

import { bonusData } from "../../fakeData/bonus";
import { colors } from "../../utils/colors";
import { postCreateStyles } from "../../utils/styles";

export default function PublishPost4({ navigation }) {

    const publishContext = usePublishContext()
    const [buttonDisable, setButtonDisable] = React.useState(false)
    const [address, setAddress] = React.useState('')
    const [bonus, setBonus] = React.useState([])

    React.useEffect(() => {
        createBonus()
    }, [])

    function createBonus() {
        const cBonus = bonusData.map((data, index) => {
            data["status"] = false
            data['id'] = index
            return data
        })
        setBonus(cBonus)
    }

    function bonusChange(index) {
        const data = [...bonusData]
        data[index].status = !data[index].status
        setBonus(data)
    }

    const renderBonus = ({ item, index }) => (
        <TouchableOpacity onPress={() => bonusChange(index)}>
            {item.status === true ?
                <View style={styles.viewBonusTrue}>
                    <Image style={styles.imageBonus} source={require('../../assets/icon/whiteCarrot.png')} />
                    <Text style={styles.textBonusTrue}>{item.title}</Text>
                </View>
                :
                <View style={styles.viewBonus}>
                    <Image style={styles.imageBonus} source={require('../../assets/icon/blueCarrot.png')} />
                    <Text style={styles.textBonus}>{item.title}</Text>
                </View>
            }
        </TouchableOpacity>
    );

    async function onPressContinue() {
        await publishContext.updatePublish4(address, bonus)

        navigation.navigate('PostPublished')
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={{ height: '100%', width: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.address}>
                        <Text style={styles.title}>Lieux du rendez-vous ?</Text>
                        <TextInput style={styles.input} placeholder={'2 place paul Cézanne 13006'} placeholderTextColor={colors.primaryBlue} value={address} onChangeText={(e) => setAddress(e)} />
                    </View>
                    <View style={styles.bonus}>
                        <Text style={styles.title}>Le lieux de rendez-vous comprends...</Text>
                        <View style={styles.renderBonus}>
                            <FlatList
                                scrollEnabled={false}
                                data={bonus}
                                numColumns={3}
                                renderItem={renderBonus}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </View>
                </View>
                <View style={postCreateStyles.header}>
                    <Text style={postCreateStyles.titleHeader}>Localisation</Text>
                    <TouchableOpacity style={postCreateStyles.crossView} onPress={() => navigation.navigate('Home')}>
                        <Image style={postCreateStyles.cross} source={require("../../assets/icon/cross.png")} />
                    </TouchableOpacity>
                </View>
                <PublishFooterNav
                    firstScreen={false}
                    lastScreen={true}
                    loading={publishContext.loading}
                    disabledButton={buttonDisable}
                    onPressBack={navigation.goBack}
                    onPressContinue={onPressContinue}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.white,
        paddingHorizontal: 10
    },

    title: {
        fontWeight: '500',
        fontSize: 15,
        color: colors.primaryBlue
    },

    input: {
        width: '100%',
        height: 44,
        backgroundColor: colors.secondaryBlue,
        borderRadius: 4,
        padding: 10,
        marginTop: 10
    },


    bonus: {
        marginTop: 40
    },

    viewBonus: {
        backgroundColor: colors.secondaryBlue,
        width: 110,
        height: 110,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4
    },

    imageBonus: {
        width: 46,
        height: 46
    },

    textBonus: {
        fontWeight: '500',
        fontSize: 13,
        color: colors.primaryBlue,
        marginTop: 10
    },

    viewBonusTrue: {
        backgroundColor: colors.thirdBlue,
        width: 110,
        height: 110,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4
    },

    textBonusTrue: {
        fontWeight: '500',
        fontSize: 13,
        color: colors.white,
        marginTop: 10
    },

    renderBonus: {
        marginTop: 10
    },

    address: {
        marginTop: Platform.OS === 'ios' ? 80 : 100,
    }

})
