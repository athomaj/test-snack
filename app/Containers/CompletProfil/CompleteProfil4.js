import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import { TextAreaComponent } from '../../Components/Utils/TextAreaComponent';

import { useUserContext } from '../../context/UserContext';

import { sharedStyles } from '../../utils/styles';
import { isIphoneX } from '../../utils/isIphoneX';

export default function CompletProfil4({ route, navigation }) {

    const userContext = useUserContext();

    const [description, setDescription] = React.useState('')
    const [pleasure, setPleasure] = React.useState('')
    const [favoriteDish, setFavoriteDish] = React.useState('')

    const descriptionTexteArea = React.useRef("")
    const pleasureTexteArea = React.useRef("")
    const favoriteDishTexteArea = React.useRef("")

    React.useEffect(() => {
        if (route.params?.position) {
            setDescription(userContext.authState.user?.description ? userContext.authState.user?.description : "")
            setPleasure(userContext.authState.user?.guiltyPleasure ? userContext.authState.user?.guiltyPleasure : "")
            setFavoriteDish(userContext.authState.user?.favoriteDish ? userContext.authState.user?.favoriteDish : "")
        }
    }, [])

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                <KeyboardAwareScrollView keyboardDismissMode="on-drag" style={{ width: '100%', height: '100%' }} contentContainerStyle={{ paddingTop: isIphoneX() ? 40 : 20, paddingHorizontal: 10 }}>

                {route.params?.position &&
                            <TouchableOpacity onPress={navigation.goBack} style={{ height: 30, width: 40 }}>
                                <Image style={{ height: '60%', width: '80%', resizeMode: 'contain' }} source={require('../../assets/icon/return_icon.png')}></Image>
                            </TouchableOpacity>
                        }
                    <Text style={{ ...sharedStyles.h2, marginBottom: 15 }}>A propos de vous</Text>
                    <Text style={{ ...sharedStyles.shortText, marginBottom: 25 }}>Quoi que vous aimiez, vous le trouverez ici.</Text>

                    <View style={{ width: '100%' }}>

                        <TextAreaComponent
                            ref={descriptionTexteArea}
                            value={description}
                            heightSize={170}
                            callBackText={setDescription}
                            maxChar={400}
                            legend='Description'
                            placeholder='Un bref descriptif de qui vous êtes...'
                            ismultiline={true}
                            // onSubmitEditing={() => pleasureTexteArea.current.focus()}
                            returnKeyType={"default"}
                        ></TextAreaComponent>

                        <TextAreaComponent
                            value={pleasure}
                            heightSize={80}
                            callBackText={setPleasure}
                            legend='Mon plaisir coupacle'
                            placeholder='Le chocolat'
                            ref={pleasureTexteArea}
                            // onSubmitEditing={() => favoriteDishTexteArea.current.focus()}
                            returnKeyType={"next"}
                        ></TextAreaComponent>

                        <TextAreaComponent
                            value={favoriteDish}
                            heightSize={90}
                            callBackText={setFavoriteDish}
                            legend='Si je devais choisir mon plat préférée...'
                            placeholder='Le gateau au chocolat'
                            ref={favoriteDishTexteArea}
                            returnKeyType={"default"}
                        ></TextAreaComponent>

                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
            {route.params?.position ?
                <TouchableOpacity
                    onPress={() => {
                        userContext.updateUserInformation({
                            "description": description,
                            "guiltyPleasure": pleasure,
                            "favoriteDish": favoriteDish
                        });
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
                    disabledButton={!(description.length > 1 && pleasure.length > 1 && favoriteDish.length > 1)}
                    onPressBack={navigation.goBack}
                    onPressContinue={() => navigation.navigate('UpdateProfil5')}
                    updatecontext={() => userContext.updateUserInformation({
                        "description": description,
                        "guiltyPleasure": pleasure,
                        "favoriteDish": favoriteDish
                    })}
                ></SignupFooterNav>
            }
        </View>
    );
}