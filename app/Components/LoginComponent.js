import React from 'react';
import { View, TouchableOpacity, Text, TextInput, Image, ActivityIndicator } from 'react-native';

import validateEmail from '../utils/sharedFunctions';
import { displayAlert } from '../utils/displayAlert';
import { sharedStyles } from '../utils/styles';
import { colors } from '../utils/colors';

export default function LoginComponent({ loading, error, requestLogin, loginStatus }) {

    const [email, setEmail] = React.useState("")
    const [pass, setPass] = React.useState("")

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
        <View style={{ height: '100%', width: '100%', alignItems: 'center', backgroundColor: 'white' }}>
            <View style={{ height: '20%', width: '60%', justifyContent: 'flex-end' }}>
                <Image style={{ height: '80%', width: '100%', resizeMode: 'contain' }} source={require('../assets/logo_typo.png')}></Image>
            </View>
            <View style={{ height: '60%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TextInput autoCorrect={false} autoCapitalize='none' autoComplete='email' keyboardType='email-address' value={email} onChangeText={(text) => changeText(text, 0)} placeholder='Email*' style={{ ...sharedStyles.shadow, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>
                <TextInput secureTextEntry={true} value={pass} onChangeText={(text) => changeText(text, 1)} placeholder='Mot de passe*' style={{ ...sharedStyles.shadow, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15 }}></TextInput>
                <Text style={{ marginTop: 10, fontSize: 13, color: colors.red }}>{error}</Text>
            </View>

            <View style={{ width: '90%', position: 'absolute', bottom: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={sendLogin} style={{ ...sharedStyles.primaryButtonWithoutColor, backgroundColor: colors.primaryYellow, marginBottom: 10 }}>
                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>Connexion</Text>
                    <ActivityIndicator style={{ position: 'absolute', right: 15 }} animating={loading} color={'white'}></ActivityIndicator>
                </TouchableOpacity>

                <TouchableOpacity onPress={loginStatus} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'normal', color: 'black' }}>Pas encore membre ? <Text style={{ fontWeight: 'bold' }}>S'inscrire</Text></Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}