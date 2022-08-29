import React from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, Image, Dimensions, FlatList, ScrollView, ActivityIndicator } from 'react-native';

import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import TextLinkComponent from '../../Components/Utils/TextLinkComponent';

import { useUserContext } from '../../context/UserContext';

import dietApi from '../../services/dietApi';

import { sharedStyles } from '../../utils/styles';
import { isIphoneX } from '../../utils/isIphoneX';
import { colors } from '../../utils/colors';
import { BASE_URL } from '../../config/config';

const WIDTHCONTAINER = (Dimensions.get('window').width / 3) - 21;

export default function SignUpStep3Container({ route, navigation }) {

    const userContext = useUserContext();

    const [dietsSelected, setDietsSelected] = React.useState([])
    const [diets, setDiets] = React.useState([])

    const [error, setError] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (userContext.authState.user.kitchen.length > 0) {
            const array = userContext.authState.user.diet.flatMap((item) => item.id)
            setDietsSelected(array)
        }
        getDiets()
    }, [])

    async function getDiets() {
        setLoading(true)
        setError(false)
        const resultOfData = await dietApi.getAllDiets();

        if (resultOfData?.data) {
            setDiets(resultOfData.data)
        } else {
            setError(true)
        }
        setLoading(false)
    }

    function dietTaped(item) {
        const arrayToEdit = [...dietsSelected]
        const index = arrayToEdit.indexOf(item.id)

        if (index === -1) {
            arrayToEdit.push(item.id)
        } else {
            arrayToEdit.splice(index, 1)
        }
        setDietsSelected(arrayToEdit)
    }

    const renderItem = React.useCallback(
        ({ item, index }) => {
            return (
                <TouchableOpacity onPress={() => dietTaped(item)} style={{ backgroundColor: dietsSelected.includes(item.id) ? colors.orange1 : colors.green1, height: WIDTHCONTAINER, width: WIDTHCONTAINER, borderRadius: 4, marginBottom: 12, justifyContent: 'flex-end', alignItems: 'center' }}>
                    {dietsSelected.includes(item.id) ?
                        <Image source={{uri : BASE_URL+item.attributes.image.data.attributes.url}} style={{ width: 35, height: 35, resizeMode: 'contain' }} />
                        :
                        <Image source={{uri : BASE_URL+item.attributes.image.data.attributes.url}} style={{ width: 35, height: 35, resizeMode: 'contain' }} />
                    }
                    <Text style={{
                        fontSize: 13,
                        color: dietsSelected.includes(item.id) ? 'black' : colors.darkGreen,
                        fontWeight: '500',
                        marginVertical: 12
                    }}
                    >{item.attributes.name}</Text>

                </TouchableOpacity>)
        },
        [dietsSelected]
    );

    //SignUpStep1
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: colors.backgroundColor }}>
                <View style={{ width: '100%', height: '100%', paddingTop: '8%', paddingHorizontal: 15 }}>
                    <ScrollView style={{ width: '100%', height: '100%' }} scrollEnabled={false}>
                        {route.params?.position &&
                            <TouchableOpacity onPress={navigation.goBack} style={{ height: 30, width: 40 }}>
                                <Image style={{ height: '60%', width: '80%', resizeMode: 'contain' }} source={require('../../assets/icon/return_icon.png')}></Image>
                            </TouchableOpacity>
                        }
                        <Text style={{ ...sharedStyles.h2, width: '100%' }}>Régime alimentaire</Text>
                        <Text style={{ ...sharedStyles.p, height: 55, marginBottom: 15 }}>Bon à savoir pour organiser un diner ou un atelier avec toi...</Text>
                        {error ?
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: 'red' }}>Une Erreur est survenue, veuillez réessayer</Text>
                                <TouchableOpacity onPress={getDiets} style={{ height: 40, width: 40, padding: 5 }}>
                                    <Image style={{ height: '100%', width: '100%', resizeMode: 'contain' }} source={require('../../assets/refresh.png')}></Image>
                                </TouchableOpacity>
                            </View>
                            :
                            <>
                                <FlatList
                                    data={diets}
                                    renderItem={renderItem}
                                    style={{ width: '100%' }}
                                    horizontal={false}
                                    numColumns={3}
                                    keyExtractor={item => item.id}
                                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                                />
                                {!route.params?.position &&
                                <>
                                <Text style={{ ...sharedStyles.p, paddingTop: 15 }}>Votre régime alimentaire n’est dans la liste ?</Text>
                                <Text style={{ ...sharedStyles.p, marginBottom: 25 }}>N’hésitez pas à nous <TextLinkComponent navigateTo={() => console.log("navigate to")} text='contacter'></TextLinkComponent>. pour qu’on l’ajoute </Text>
                                </>
                                }
                            </>
                        }
                        {loading &&
                            <ActivityIndicator animating={loading} hidesWhenStopped={true} color={'black'}></ActivityIndicator>
                        }
                    </ScrollView>
                </View>
            </SafeAreaView>

            {route.params?.position ?
                <TouchableOpacity
                    onPress={() => {
                        userContext.updateUserInformation({ "diet": dietsSelected });
                        navigation.goBack();
                    }}
                    style={{ ...sharedStyles.primaryButtonWithColor, width: '80%', position: 'absolute', bottom: 20, zIndex: 1, alignSelf: 'center' }}
                >
                    <Text style={{ ...sharedStyles.textUnderPrimaryButton }}>Modifier</Text>
                </TouchableOpacity>
                :
                <SignupFooterNav
                    title={"Suivant"}
                    canGoBack={true}
                    disabledButton={!(dietsSelected.length > 0)}
                    onPressBack={navigation.goBack}
                    onPressContinue={() => navigation.navigate('UpdateProfil4')}
                    updatecontext={() => userContext.updateUserInformation({ "diet": dietsSelected })}
                ></SignupFooterNav>
            }
        </View>
    );
}

