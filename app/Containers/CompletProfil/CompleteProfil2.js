import React from 'react';
import { SafeAreaView, Image, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import { useUserContext } from '../../context/UserContext';
import kitchenApi from '../../services/kitchenApi';
import { sharedStyles } from '../../utils/styles';
import { isIphoneX } from '../../utils/isIphoneX';

export default function CompletProfil2({ route, navigation }) {

    const userContext = useUserContext();

    const [cookingType, setCookingType] = React.useState([])
    const [cookingTypeSelected, setCookingTypeSelected] = React.useState([])

    const [error, setError] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (userContext.authState.user.kitchen.length > 0) {
            const array = userContext.authState.user.kitchen.flatMap((item) => item.id)
            setCookingTypeSelected(array)
        }
        getCookingType()
    }, [])

    async function getCookingType() {
        setLoading(true)
        const resultOfData = await kitchenApi.getAllKitchen();

        if (resultOfData?.data) {
            setCookingType(resultOfData.data)
        } else {
            setError(true)
        }
        setLoading(false)
    }

    function cookingTaped(item) {
        const arrayToEdit = [...cookingTypeSelected]
        const index = arrayToEdit.indexOf(item.id)

        if (index === -1) {
            arrayToEdit.push(item.id)
        } else {
            arrayToEdit.splice(index, 1)
        }
        setCookingTypeSelected(arrayToEdit)
    }

    const renderItem = React.useCallback(
        ({ item, index }) => {
            return (
                <TouchableOpacity onPress={() => cookingTaped(item)} style={{ ...sharedStyles.inputText, marginBottom: 13, justifyContent: 'center' }}><Text style={{ ...sharedStyles.shortText, textAlignVertical: 'center' }}>{item.attributes.name}</Text>
                    {cookingTypeSelected.includes(item.id) &&
                        <Image source={require('../../assets/icon/validate_icon.png')} style={{ position: 'absolute', right: 8, width: 21, height: 21, }} />
                    }
                </TouchableOpacity>
            )
        }, [cookingTypeSelected])

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: isIphoneX() ? 40 : 20, paddingHorizontal: 10 }}>
                    <FlatList
                        ListHeaderComponentStyle={{ backgroundColor: 'white' }}
                        ListHeaderComponent={
                            <View>
                                {route.params?.position &&
                                    <TouchableOpacity onPress={navigation.goBack} style={{ height: 30, width: 40}}>
                                        <Image style={{height: '60%', width: '80%', resizeMode: 'contain'}} source={require('../../assets/icon/return_icon.png')}></Image>
                                    </TouchableOpacity>
                                }
                                <Text style={{ ...sharedStyles.h2, marginBottom: 15 }}>Type de cuisine</Text>
                                <Text style={{ ...sharedStyles.shortText, marginBottom: 25 }}>Quoi que vous aimiez, vous le trouverez ici. </Text>
                            </View>
                        }
                        style={{ width: '100%', height: '100%' }}
                        contentContainerStyle={{ paddingBottom: 80 }}
                        data={cookingType}
                        renderItem={renderItem}
                        stickyHeaderIndices={[0]}
                    />
                    {error &&
                        <View style={{ zIndex: 1, position: 'absolute', alignItems: 'center' }}>
                            <Text style={{ color: 'red' }}>Une Erreur est survenue, veuillez réessayer</Text>
                            <TouchableOpacity onPress={getCookingType} style={{ height: 40, width: 40, padding: 5 }}>
                                <Image style={{ height: '100%', width: '100%', resizeMode: 'contain' }} source={require('../../assets/refresh.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    }
                    {loading &&
                        <ActivityIndicator animating={loading} hidesWhenStopped={true} color={'black'} style={{ zIndex: 1, position: 'absolute' }}></ActivityIndicator>
                    }
                </View>
            </SafeAreaView>
            {route.params?.position ?
                <TouchableOpacity
                    onPress={() => {
                        userContext.updateUserInformation({ "kitchen": cookingTypeSelected });
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
                    disabledButton={false}
                    onPressBack={navigation.goBack}
                    onPressContinue={() => navigation.navigate('UpdateProfil3')}
                    updatecontext={() => userContext.updateUserInformation({ "kitchen": cookingTypeSelected })}
                >
                </SignupFooterNav>
            }
        </View>
    );
}