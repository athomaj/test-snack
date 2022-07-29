import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import PicturePickerComponent from '../../Components/Utils/PicturePickerComponent';

import { useUserContext } from '../../context/UserContext';

import { isIphoneX } from '../../utils/isIphoneX';
import { sharedStyles } from '../../utils/styles';


export default function CompletProfil5({ navigation }) {
    const userContext = useUserContext();

    const [image, setImage] = React.useState('')

    //SignUpStep1
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                <View keyboardDismissMode="on-drag" style={{ width: '100%', height: '100%', paddingTop: isIphoneX() ? 40 : 20, paddingHorizontal: 10 }}>

                    <Text style={{ ...sharedStyles.h2, marginBottom: 15 }}>Photo de profil</Text>
                    <Text style={{ ...sharedStyles.shortText, marginBottom: 25 }}>Dernière étapes, une belle photo de profil. Une photo donne vie à ton profil, donnant aux autres une meilleure idée de qui vous êtes.</Text>
                    <View style={{ height: '60%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PicturePickerComponent image={image?.uri} setParamImage={(returnImage) => setImage(returnImage)}></PicturePickerComponent>
                    </View>
                </View>
            </SafeAreaView>

            <SignupFooterNav
                title={"Suivant"}
                canGoBack={true}
                disabledButton={image ? false : true}
                onPressBack={navigation.goBack}
                onPressContinue={() => navigation.navigate('MainStack')}
                updatecontext={() => userContext.updateUserInformation({ "picture": image?.uri })}
            ></SignupFooterNav>
        </View>
    );
}