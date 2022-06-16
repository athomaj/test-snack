import React from 'react';
import { SafeAreaView, TextInput, View, TouchableOpacity, Text, ActivityIndicator, Image } from 'react-native';
import { colors } from '../utils/colors';
import { isIphoneX } from '../utils/isIphoneX';
import { sharedStyles, primaryButton, title } from '../utils/styles';
import { useFocusEffect } from '@react-navigation/native';
import HeaderChapter from './Utils/HeaderChapter';
import ImagePickerExample from './Utils/picturePicker';

export default function SignUpComponent({ loading, requestSignUp, loginStatus }) {

    // Voir pour utiliser un context const userContext = useUserContext();
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [stepNumber, setStep] = React.useState(0)
    const [disabledButton, setDisabledButton] = React.useState(true)
    const [ctaStyle, setValidateStepOne] = React.useState(primaryButton.disabled)
    

    function incremmentStep(stepIndex){
        setStep(stepNumber+stepIndex)
    }
    
    function validationStep(){
        if(stepNumber === 1 && pass.length >= 6 && email !== null)
        {
            setDisabledButton(false)
            setValidateStepOne(primaryButton.avalable)
        }
        else if(stepNumber === 2 && name !== null){
            setDisabledButton(false)
            setValidateStepOne(primaryButton.avalable)
        }
        else
        {
            console.log('innaccessible')
            setDisabledButton(true)
            setValidateStepOne(primaryButton.disabled)
        }
    }

        return (
            <SafeAreaView style={{ height: '100%', width: '100%', display: 'flex'}}>
            {stepNumber > 0 &&
            <TouchableOpacity onPress={() => incremmentStep(-1)}>
                <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold',marginLeft: '5%', marginTop: '5%', marginBottom: '5%'}}> retour </Text>
            </TouchableOpacity>
            }
            {stepNumber === 0 &&
            <View style={{ width: '100%', height: '90%', display: 'flex', alignItems: 'center'}} >
                <Image style={{ width: '50%', height: '20%', resizeMode: 'contain', marginBottom: '5%', marginTop: '5%'}} source={require('../assets/logo_typo.png')}></Image>
                <View style={{ height: '50%', width: '80%', display: 'flex', justifyContent:"flex-start"}}>
                    <Text style={title.h1}>Hello fou de food!</Text>
                    <Text>Ici vous allez pouvoir partager votre passion de la cuisine avec vos voisins de quartier. Ateliers thématiques, dîners partagés, prêt de matériel, bons plans circuits courts, défi de Chef, vous êtes entre passionés et en confiance.</Text>
                    <Text>Nous avons tout prévu pour que tout se passe bien, nous comptons aussi sur vous pour qu’une atmosphère de bienveillance et de partage règne!</Text>
                </View>

                <View style={{ width: '100%', position: 'absolute', bottom: 20, alignItems: 'center' }}>
                
                    <TouchableOpacity onPress={() => incremmentStep(1)} style={{ ...primaryButton.avalable, margin: '3%'}}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Je m'inscris</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, fontWeight: 'normal', color: 'black' }}>Déjà membre ? <Text style={{fontWeight: 'bold'}}>Se connecter</Text></Text>
                    </TouchableOpacity>

                </View>
            </View>
            }
            {stepNumber === 1 &&
            <View style={{ width: '100%', height: '90%', display: 'flex', alignItems: 'center'}}>
                <HeaderChapter text={'Créez votre compte'}></HeaderChapter>
                <TextInput  value={email} onChangeText={(text) => setEmail(text)} onEndEditing={validationStep} placeholder='Email' style={{ ...sharedStyles.borderBasic, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>
                <TextInput  value={pass} onChangeText={(text) => setPass(text)} onEndEditing={validationStep} placeholder='Mot de passe' style={{ ...sharedStyles.borderBasic, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>

                <View style={{ position: 'absolute', bottom: isIphoneX() ? 30 : 10, alignItems: 'center', width: '100%' }}>
                    <TouchableOpacity disabled={disabledButton}  onPress={() => incremmentStep(1)}  style={{ ...ctaStyle, margin: '3%'}}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Continuer</Text>
                    </TouchableOpacity>
                </View>
            </View>
            }
            {stepNumber === 2 &&
            <View style={{ width: '100%', height: '90%', display: 'flex', alignItems: 'center'}}>
                <HeaderChapter text={'Vous êtes?'}></HeaderChapter>
                <TextInput value={name} onChangeText={(text) => setName(text)} placeholder='Prénom' style={{ ...sharedStyles.borderBasic, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>
                <View>
                    <ImagePickerExample></ImagePickerExample>
                    <Image style={{ width: 128, height: 128, resizeMode: 'contain', marginBottom: '5%', marginTop: '5%'}} source={require('../assets/splash_login/userIcon.png')}></Image>
                </View>
                <View style={{ position: 'absolute', bottom: isIphoneX() ? 30 : 10, alignItems: 'center', width: '100%' }}>
                    <TouchableOpacity onPress={loginStatus} style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, fontWeight: 'normal', color: 'black' }}>Vous avez un compte ? Connectez-vous !</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={requestSignUp} style={{ ...sharedStyles.shadow, height: 50, width: '80%', borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator style={{position: 'absolute', right: 15}} animating={loading} color={'black'}></ActivityIndicator>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Inscription</Text>
                    </TouchableOpacity>
                </View>
            </View>
            }
        </SafeAreaView>
        );
}