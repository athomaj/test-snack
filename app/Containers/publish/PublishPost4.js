import React from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import PublishFooterNav from "../../Components/Utils/PublishFooterNav";
import { BASE_URL } from "../../config/config";
import { usePublishContext } from "../../context/PublishContext";
import { bonusData } from "../../fakeData/bonus";
import infoApi from "../../services/infoApi";
import { colors } from "../../utils/colors";
import { postCreateStyles, sharedStyles } from "../../utils/styles";
import { Dimensions } from "react-native";
import SignupFooterNav from "../../Components/Utils/SignupFooterNav";
const WIDTHCONTAINER = (Dimensions.get('window').width / 3) - 21;
export default function PublishPost4({ navigation }) {

    const publishContext = usePublishContext()
    const [buttonDisable, setButtonDisable] = React.useState(false)
    const [address, setAddress] = React.useState('')
    const [bonus, setBonus] = React.useState([])

    async function callDiet(){
        const response = await infoApi.getAllinfo()
        if (response) {
            console.log(response)
            const infos =  response.data.map((info) => { return {'id': info.id, 'title': info.attributes.name, 'image': BASE_URL+info.attributes.image.data.attributes.url }})
                console.log(infos)
            setBonus(infos)
        } else {
            setError(true)
        }
    }

    React.useEffect(() => {
        callDiet()
        
    }, [])


    function bonusChange(index) {
        const data = [...bonus]
        data[index].status = !data[index].status
        setBonus(data)
    }

    const renderBonus = ({ item, index }) => (
        <TouchableOpacity onPress={() => bonusChange(index)}>
            {item.status === true ?
                <View style={styles.viewBonusTrue}>
                    {item.image &&
                        <Image style={styles.imageBonus} source={{uri : item.image}} />
                    }
                    <Text style={styles.textBonusTrue}>{item.title}</Text>
                </View>
                :
                <View style={styles.viewBonus}>
                    {item.image &&
                        <Image style={styles.imageBonus} source={{uri : item.image}} />
                    }
                    <Text style={styles.textBonus}>{item.title}</Text>
                </View>
            }
        </TouchableOpacity>
    );

    async function onPressContinue() {
        await publishContext.finalPost(address, bonus)

        navigation.navigate('PostPublished')
    }

    return (
        <SafeAreaView style={{ backgroundColor:  colors.backgroundColor }}>
            <View style={{ height: '100%', width: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.address}>
                        <Text style={styles.title}>Lieux du rendez-vous ?</Text>
                        <TextInput style={styles.input} placeholder={'Ex : 2 place paul Cézanne'} placeholderTextColor={colors.grey2} value={address} onChangeText={(text) => setAddress(text)} />
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
                {/* <PublishFooterNav
                    firstScreen={false}
                    lastScreen={true}
                    loading={publishContext.loading}
                    disabledButton={buttonDisable}
                    onPressBack={navigation.goBack}
                    onPressContinue={onPressContinue}
                /> */}
                <SignupFooterNav
                    loading={publishContext.loading}
                    disabledButton={buttonDisable}
                    onPressBack={navigation.goBack}
                    onPressContinue={onPressContinue}
                    title="Publier"
                    canGoBack={true}
                ></SignupFooterNav>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        ...sharedStyles.wrapperHeaderSpace,
        paddingHorizontal: 15
    },

    title: {
        fontWeight: '500',
        fontSize: 15,
        color: colors.primaryBlue
    },

    input: {
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 10,
        marginTop: 10
    },


    bonus: {
        marginTop: 40
    },

    viewBonus: {
        backgroundColor: colors.green1,
        width: WIDTHCONTAINER,
        height: WIDTHCONTAINER,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4
    },

    imageBonus: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },

    textBonus: {
        fontWeight: '500',
        fontSize: 13,
        color: colors.primaryBlue,
        marginTop: 10
    },

    viewBonusTrue: {
        backgroundColor: colors.orange1,
        width: WIDTHCONTAINER,
        height: WIDTHCONTAINER,
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
