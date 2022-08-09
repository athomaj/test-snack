import React from 'react';
import { SafeAreaView, TouchableOpacity, Text, Image, Dimensions, FlatList, ScrollView, Platform, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import TextLinkComponent from '../../Components/Utils/TextLinkComponent';

import { useSignUpContext } from '../../context/SignUpContext';
import { useUserContext } from '../../context/UserContext';

import citiesApi from '../../services/citiesApi';

import { sharedStyles } from '../../utils/styles';
import { isIphoneX } from '../../utils/isIphoneX';
import { colors } from '../../utils/colors';

const WIDTHCONTAINER = (Dimensions.get('window').width / 2) - 21;

export default function SignUpStep3Container({ route, navigation }) {

    const signUpContext = useSignUpContext();
    const userContext = useUserContext();

    const [citySelected, setCitySelected] = React.useState(null)
    const [city, setcity] = React.useState(null)
    const [errorMessage, setErrorMessage] = React.useState(null)

    const [selectedAroddissement, setselectedAroddissement] = React.useState(null);
    const [selectedcity, setSelectedcity] = React.useState([])

    const [showPicker, setShowPicker] = React.useState(false);

    React.useEffect(() => {
        getAllCities()
    }, [])

    React.useEffect(() => {
        setSelectedcity(SelectPicker)
    }, [citySelected])

    React.useEffect(() => {
        if (userContext.authState.isConnected) {
            navigation.replace('SignUpStep4')
        }
        if (userContext.authState.errorMessage) {
            setErrorMessage(userContext.authState.errorMessage)
        }
    }, [userContext.authState.isConnected, userContext.authState.errorMessage])

    const getAllCities = async () => {
        const citiesAll = await citiesApi.getAllCities();
        citiesAll?.data ? setcity(citiesAll.data) : null
    }

    const SelectPicker = () => {
        if (citySelected) {
            const cityOnselected = [...citySelected.attributes.districts.data]
            const arrondissements = cityOnselected.map(element => {
                return <Picker.Item key={element.id} style={{ color: colors.primaryYellow }} label={element.attributes.name} value={element.id} />
            })
            return (
                arrondissements
            )
        }
    };

    function cityTapped(item) {
        setCitySelected(item)
        setselectedAroddissement(item.id)
    }

    function registerTapped() {
        setErrorMessage(null)
        signUpContext.register(selectedAroddissement)
    }

    const renderItem = React.useCallback(
        ({ item, index }) => {
            return (
                <TouchableOpacity key={item.id} onPress={() => cityTapped(item)} style={{ backgroundColor: '#E6EFF7', height: 87, width: WIDTHCONTAINER, borderRadius: 4, marginBottom: 12 }}>
                    {citySelected && item.attributes.name === citySelected.attributes.name &&
                        <Image source={require('../../assets/icon/validate_icon.png')} style={{ position: 'absolute', top: 8, right: 8, width: 21, height: 21, }} />
                    }
                    <Text style={{ ...sharedStyles.shortText, position: 'absolute', bottom: 0, left: 0, paddingLeft: 10, paddingBottom: 10 }}>{item.attributes.name}</Text>
                </TouchableOpacity>)
        },
        [citySelected]
    );

    //SignUpStep1
    return (
        <SafeAreaView style={{ height: '100%', width: '100%' }}>
            <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ paddingHorizontal: 10, paddingTop: isIphoneX() ? 40 : 20 }} scrollEnabled={false}>
                <Text style={{ ...sharedStyles.h2, width: '100%' }}>Où habites-tu ? </Text>
                <Text style={{ ...sharedStyles.shortText, height: 55 }}>Participe avec nous à développer la vie du quartier de ta ville.</Text>
                <FlatList
                    data={city}
                    renderItem={renderItem}
                    style={{ width: '100%' }}
                    horizontal={false}
                    numColumns={2}
                    keyExtractor={item => item.id}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                />
                { !route.params?.position  &&
                <Text style={{ ...sharedStyles.label, paddingTop: 15, marginBottom: 25 }}>FoodFood est en plein développement. Si tu ne trouves pas ta ville n’hésite pas à la
                    <TextLinkComponent
                        navigateTo={() => console.log("navigate to")}
                        text='suggérer ici'>
                    </TextLinkComponent>
                    .
                </Text>
                }

                {citySelected && Platform.OS === 'ios' &&
                    <>
                        <Text style={{ ...sharedStyles.h3, marginBottom: 10 }}>Quel est ton quartier ?</Text>
                        <TouchableOpacity onPress={() => setShowPicker(true)} style={{ backgroundColor: '#E6EFF7', borderRadius: 4, height: 40, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'flex-start', color: colors.primaryYellow }}>
                            <Text style={{ fontSize: 15, fontWeight: '400', color: 'black' }}>{selectedAroddissement ? "" + selectedAroddissement : "Sélectionnez son quartier"}</Text>
                        </TouchableOpacity>
                    </>
                }
                {citySelected && Platform.OS === "android" &&
                    <Picker style={{ ...sharedStyles.inputText }}
                        selectedValue={selectedAroddissement}
                        itemStyle={{ textAlign: 'center' }}
                        onValueChange={(itemValue, itemIndex) => {
                            setselectedAroddissement(itemValue);
                        }
                        }>
                        {selectedcity}
                    </Picker>
                }
            </ScrollView>
            
            { route.params?.position ?
                <TouchableOpacity
                onPress={() =>{
                    userContext.updateUserInformation({ district : selectedAroddissement});
                    navigation.goBack();
                }}
                style={{...sharedStyles.primaryButtonWithColor, width: '80%', position: 'absolute', bottom: 20, zIndex: 1, alignSelf: 'center'}}
                >
                <Text style={{...sharedStyles.textUnderPrimaryButton}}>Modifier</Text>
                </TouchableOpacity>
            :
            <SignupFooterNav
                title={"S'inscrire"}
                canGoBack={true}
                errorMessage={errorMessage}
                loading={userContext.authState.isLoading}
                disabledButton={selectedAroddissement ? false : true}
                onPressBack={navigation.goBack}
                onPressContinue={() => console.log("continue")}
                updatecontext={registerTapped}
            >
            </SignupFooterNav>
            }
            

            {showPicker &&
                <View style={{ zIndex: 1, position: 'absolute', bottom: 0, width: '100%' }}>
                    <View style={{ height: 40, width: '100%', alignItems: 'flex-end', justifyContent: 'center', backgroundColor: colors.greyImage }}>
                        <TouchableOpacity onPress={() => setShowPicker(false)} style={{ height: 40, width: 100, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: colors.thirdBlue, fontSize: 15, fontWeight: 'bold' }}>Valider</Text>
                        </TouchableOpacity>
                    </View>
                    <Picker style={{ height: 250, width: '100%', backgroundColor: '#ffffff' }}
                        selectedValue={selectedAroddissement}
                        itemStyle={{ textAlign: 'center' }}
                        onValueChange={(itemValue, itemIndex) => {
                            setselectedAroddissement(itemValue);
                        }
                        }>
                        {selectedcity}
                    </Picker>
                </View>
            }
        </SafeAreaView>
    );
}

