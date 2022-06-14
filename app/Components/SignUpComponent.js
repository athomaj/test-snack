import React from 'react';
import { SafeAreaView, TextInput, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import { colors } from '../utils/colors';
import { isIphoneX } from '../utils/isIphoneX';
import { sharedStyles } from '../utils/styles';

export default SignUpComponent = ({ loading, requestSignUp, loginStatus }) => {

    // Voir pour utiliser un context const userContext = useUserContext();
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [pass, setPass] = React.useState("")

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <TextInput value={name} onChangeText={(text) => setName(text)} placeholder='Nom et Prénom' style={{ ...sharedStyles.shadow, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>
            <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder='Email' style={{ ...sharedStyles.shadow, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>
            <TextInput value={pass} onChangeText={(text) => setPass(text)} placeholder='Mot de passe' style={{ ...sharedStyles.shadow, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>

            <View style={{ position: 'absolute', bottom: isIphoneX() ? 30 : 10, alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={loginStatus} style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'normal', color: 'black' }}>Vous avez un compte ? Connectez-vous !</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={requestSignUp} style={{ ...sharedStyles.shadow, height: 50, width: '80%', borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator style={{position: 'absolute', right: 15}} animating={loading} color={'black'}></ActivityIndicator>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Inscription</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}