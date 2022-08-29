import React from 'react';
import { View, TouchableOpacity, Text, TextInput, Image, ActivityIndicator } from 'react-native';

import validateEmail from '../utils/sharedFunctions';
import { displayAlert } from '../utils/displayAlert';
import { sharedStyles } from '../utils/styles';
import { colors } from '../utils/colors';
import SignupFooterNav from './Utils/SignupFooterNav';

export default function LoginComponent({ loading, error, requestLogin, loginStatus, goBack }) {

    const [email, setEmail] = React.useState("test@test.fr")
    const [pass, setPass] = React.useState("123456")

    function sendLogin() {
        if (email.length > 0 && pass.length > 0) {
            if (validateEmail(email)) {
                requestLogin(email, pass)
            } else {
                displayAlert("Oups...", 'Il semble que votre email ne soit pas valide')
            }
            return
        }
        displayAlert("Oups...", 'Veuillez renseigner les champs')
    }

    function changeText(text, index) {
        if (index === 0) {
            setEmail(text)
        } else {
            setPass(text)
        }
    }

    return (
        <View style={{...sharedStyles.wrapperHeaderSpace, alignItems: 'center',paddingHorizontal: 15  }}>
            <View style={{ height: '100%', width: '100%'}}>
                <Text style={{...sharedStyles.bigTitle}}>Bienvenue</Text>
                <Text style={{...sharedStyles.p, marginBottom: 30}}>Content de vous revoir. Nous comptons sur vous pour qu’une atmosphère de bienveillance et de partage règne!</Text>
                <TextInput autoCorrect={false} autoCapitalize='none' autoComplete='email' keyboardType='email-address' value={email} onChangeText={(text) => changeText(text, 0)} placeholder='Email*' placeholderTextColor={colors.darkGreen} style={{ ...sharedStyles.inputText, marginBottom: 10 }}></TextInput>
                <TextInput secureTextEntry={true} value={pass} onChangeText={(text) => changeText(text, 1)} placeholder='Mot de passe*' style={{...sharedStyles.inputText, marginBottom: 24 }}></TextInput>
                <Text style={{...sharedStyles.p, color: colors.darkGreen}}>Mot de passe oublier ?</Text>
                <Text style={{ marginTop: 10, fontSize: 13, color: colors.red }}>{error}</Text>
            </View>

            <SignupFooterNav
            title = 'Connexion'
            canGoBack = {true}
            onPressContinue = {sendLogin}
            onPressBack = {goBack}
            loading={loading}
            ></SignupFooterNav>

        </View>
    );
}