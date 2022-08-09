import React from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, Image, Dimensions, FlatList, ScrollView } from 'react-native';

import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import TextLinkComponent from '../../Components/Utils/TextLinkComponent';

import { useUserContext } from '../../context/UserContext';

import dietApi from '../../services/dietApi';

import { sharedStyles } from '../../utils/styles';
import { isIphoneX } from '../../utils/isIphoneX';
import { colors } from '../../utils/colors';

const WIDTHCONTAINER = (Dimensions.get('window').width / 3) - 21;

export default function SignUpStep3Container({ route,navigation }) {

    const userContext = useUserContext();

    const [dietsSelected, setDietsSelected] = React.useState([])
    const [diets, setDiets] = React.useState([])

    React.useEffect(() => {

        if(userContext.authState.user.diet.length > 0){
            const newArray = userContext.authState.user.diet.map(element => element.id)
            console.log(newArray)
            setDietsSelected(newArray)
        }

        getAlldiets()
    }, [])

    async function getAlldiets() {
        const response = await dietApi.getAllDiets();
        response.data ? setDiets(response.data) : null
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
                <TouchableOpacity onPress={() => dietTaped(item)} style={{ backgroundColor: dietsSelected.includes(item.id) ? colors.primaryYellow : '#E6EFF7', height: WIDTHCONTAINER, width: WIDTHCONTAINER, borderRadius: 4, marginBottom: 12, justifyContent: 'center', alignItems: 'center' }}>
                    {dietsSelected.includes(item.id) ?
                        <Image source={require('../../assets/icon/whiteCarrot.png')} style={{ width: 35, height: 35, resizeMode: 'contain' }} />
                        :
                        <Image source={require('../../assets/icon/blueCarrot.png')} style={{ width: 35, height: 35, resizeMode: 'contain' }} />
                    }
                    <Text style={{
                        fontSize: 13,
                        color: dietsSelected.includes(item.id) ? 'white' : colors.primaryYellow,
                        fontWeight: '500',
                    }}
                    >{item.attributes.name}</Text>

                </TouchableOpacity>)
        },
        [dietsSelected]
    );

    //SignUpStep1
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                <View style={{ width: '100%', height: '100%', paddingTop: isIphoneX() ? 40 : 20, paddingHorizontal: 10 }}>
                    <ScrollView style={{ width: '100%', height: '100%' }} scrollEnabled={false}>
                        <Text style={{ ...sharedStyles.h2, width: '100%' }}>Régime alimentaire</Text>
                        <Text style={{ ...sharedStyles.shortText, height: 55 }}>Phrase de description</Text>
                        <FlatList
                            data={diets}
                            renderItem={renderItem}
                            style={{ width: '100%' }}
                            horizontal={false}
                            numColumns={3}
                            keyExtractor={item => item.id}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                        />
                        <Text style={{ ...sharedStyles.label, paddingTop: 15 }}>Votre régime alimentaire n’est dans la liste ?</Text>
                        <Text style={{ ...sharedStyles.label, marginBottom: 25 }}>N’hésitez pas à nous <TextLinkComponent navigateTo={() => console.log("navigate to")} text='contacter'></TextLinkComponent>. pour qu’on l’ajoute </Text>
                    </ScrollView>
                </View>
            </SafeAreaView>

            { route.params?.position ?
                <TouchableOpacity
                onPress={() =>{
                    userContext.updateUserInformation({ "diet": dietsSelected });
                    navigation.goBack();
                }}
                style={{...sharedStyles.primaryButtonWithColor, width: '80%', position: 'absolute', bottom: 20, zIndex: 1, alignSelf: 'center'}}
                >
                <Text style={{...sharedStyles.textUnderPrimaryButton}}>Modifier</Text>
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

