import React from 'react';
import { SafeAreaView, TextInput, View, Text } from 'react-native';

import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import { HideKeyboard } from '../../Components/Utils/HideKeyboard';

import { useSignUpContext } from '../../context/SignUpContext';

import { sharedStyles } from '../../utils/styles';
import { isIphoneX } from '../../utils/isIphoneX';
import { colors } from '../../utils/colors';

export default function SignUpStep2Container({ navigation }) {

    const SignUpContext = useSignUpContext()
    const [userName, setUsername] = React.useState("")

    return (
        <HideKeyboard>
            <View style={{ height: '100%', width: '100%' }}>
                <SafeAreaView style={{...sharedStyles.wrapperHeaderSpace}}>
                    <View style={{ width: '100%', height: '100%', paddingHorizontal: 10, paddingTop: isIphoneX() ? 40 : '8%' }}>
                        <Text style={{ ...sharedStyles.h2, width: '100%' }}>Quel est ton nom ?</Text>
                        <Text style={{ ...sharedStyles.p, height: 55 }}>{'Comment doit-on vous appeler 😊'}</Text>
                        <TextInput
                            value={userName}
                            onChangeText={(text) => setUsername(text)}
                            placeholder='Ex : Nom Prénom (nom utilisateur)'
                            placeholderTextColor={colors.darkGreen}
                            style={{ ...sharedStyles.inputText, marginTop: 15 }}
                        ></TextInput>
                       
                    </View>
                </SafeAreaView>

                <SignupFooterNav
                    title={"Suivant"}
                    canGoBack={true}
                    disabledButton={false}
                    // disabledButton={(!userName.length > 0)}
                    onPressBack={navigation.goBack}
                    onPressContinue={() => navigation.navigate('SignUpStep3')}
                    updatecontext={() => SignUpContext.updateSignUp2(userName)}
                >
                </SignupFooterNav>
            </View>
        </HideKeyboard>
    );
}

