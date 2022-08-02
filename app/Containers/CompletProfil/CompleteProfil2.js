import React from 'react';
import { SafeAreaView, Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import { useUserContext } from '../../context/UserContext';
import kitchenApi from '../../services/kitchenApi';
import { sharedStyles } from '../../utils/styles';
import { isIphoneX } from '../../utils/isIphoneX';

export default function CompletProfil2({ route, navigation }) {

    const userContext = useUserContext();
    const [buttonDisable, setDisabledButton] = React.useState(true)
    const [typeOfCooks, setTypeOfCooks] = React.useState([])
    const [data, setData] = React.useState({})
    const [allKitchens, setAllKitchens] = React.useState(null)

    async function getAllKitchens() {
        const resultOfData = await kitchenApi.getAllKitchen();
        resultOfData?.data ? setAllKitchens(resultOfData.data) : null
    }

    React.useEffect(() => {
        if(userContext.authState.user.kitchen.length > 0){
           const newArray = userContext.authState.user.kitchen.map(element => element.id)
           setTypeOfCooks(newArray)
        }

        getAllKitchens()
    }, [])

    React.useEffect(() => {
        typeOfCooks.length > 0 ? setDisabledButton(false) : setDisabledButton(true);
        setData({ "kitchen": typeOfCooks })
        console.log(typeOfCooks)
    }, [typeOfCooks])


    function updateTypeOfCooks(item) {
        const modifyArray = typeOfCooks?.length > 0 ? [...typeOfCooks] : []
        if (modifyArray.length > 0) {
            modifyArray.includes(item.id) ? modifyArray.splice(modifyArray.indexOf(item.id), 1) : modifyArray.push(item.id)

        }
        else modifyArray.push(item.id)
        setTypeOfCooks(modifyArray)
    }


    const renderItem = React.useCallback(
        ({ item, index }) => {
            return (
                <TouchableOpacity onPress={() => updateTypeOfCooks(item)} style={{ ...sharedStyles.inputText, marginBottom: 13, justifyContent: 'center' }}><Text style={{ ...sharedStyles.shortText, textAlignVertical: 'center' }}>{item.attributes.name}</Text>
                    {typeOfCooks && typeOfCooks.includes(item.id) &&
                        <Image source={require('../../assets/icon/validate_icon.png')} style={{ position: 'absolute', right: 8, width: 21, height: 21, }} />
                    }
                </TouchableOpacity>
            )
        }, [typeOfCooks])

    //SignUpStep1
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                <View style={{ width: '100%', height: '100%', paddingTop: isIphoneX() ? 40 : 20, paddingHorizontal: 10 }}>
                    <FlatList
                        ListHeaderComponentStyle={{ backgroundColor: 'white' }}
                        ListHeaderComponent={<View>
                            <Text style={{ ...sharedStyles.h2, marginBottom: 15 }}>Type de cuisine</Text>
                            <Text style={{ ...sharedStyles.shortText, marginBottom: 25 }}>Quoi que vous aimiez, vous le trouverez ici. </Text>
                        </View>}
                        style={{ width: '100%', height: '100%' }}
                        contentContainerStyle={{ paddingBottom: 80 }}
                        data={allKitchens}
                        renderItem={renderItem}
                        stickyHeaderIndices={[0]}
                    />
                </View>
            </SafeAreaView>
            { route.params.position === 'goback' ?
                <TouchableOpacity
                style={{...sharedStyles.primaryButtonWithColor, width: '80%', position: 'absolute', bottom: 10, zIndex: 1, alignSelf: 'center'}}
                >
                <Text style={{...sharedStyles.textUnderPrimaryButton}}>Modifier</Text>
                </TouchableOpacity>
            :
            <SignupFooterNav
                title={"Suivant"}
                canGoBack={true}
                disabledButton={!(typeOfCooks.length > 0)}
                onPressBack={navigation.goBack}
                onPressContinue={() => navigation.navigate('UpdateProfil3')}
                updatecontext={() => userContext.updateUserInformation(data)}
            >
            </SignupFooterNav>
            }
        </View>
    );
}