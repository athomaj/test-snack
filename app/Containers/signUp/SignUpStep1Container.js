import React from 'react';
import { SafeAreaView, TextInput, View, TouchableOpacity, Text, ActivityIndicator, Image, Switch, StyleSheet, Modal, Alert } from 'react-native';
import { colors } from '../../utils/colors';
import { sharedStyles } from '../../utils/styles';
import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import Link from '../../Components/Utils/Link';
import validateEmail from '../../Components/Utils/RegexValidation';



//Importation dim'age de validation
const validateEmailicon = require('../../assets/icon/validated_color.png');
const forbidenEmail = require('../../assets/icon/forbiden_color.png');

export default function SignUpStep1Container({ navigation }) {

    
    const [email, setEmail] = React.useState("")
    const [numberPhone, setNumberPhone] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [isvalidEmail, setValideEmail] = React.useState(false)
    const [buttonDisable, setDisabledButton] = React.useState(false)
    //En cliquant sur suivant, vous acceptez les termes de nos services, et notre politique de confidentialité. 
   
    function valideInputEmail()
    {
        if(validateEmail(email)){
            setValideEmail(true)
        }
        else setValideEmail(false)
    }
    React.useEffect(()=>{
        valideInputEmail()
    },[email])


    return (
        <SafeAreaView style={{ height: '100%', width: '100%', paddingHorizontal: 15, paddingTop: 80 }}>
                <SignupFooterNav disabledButton= {buttonDisable} onPressBack={navigation.goBack} onPressContinue={() => navigation.navigate('SignUpStep2')}></SignupFooterNav>
        
                <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                    <Text style={{...sharedStyles.h2, width: '100%'}}>Créer un compte</Text>
                    <Text style={{...sharedStyles.shortText,  height:55}}>Quelques informations pour faire partie du club...</Text>
                    <View style={{ height: 44, width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                        <TextInput autoComplete='off' autoCapitalize='none' keyboardType='email-address' value={email} onChangeText={(text) => setEmail(text)} placeholder='Entrer votre email' placeholderTextColor={colors.primaryYellow} style={{ ...sharedStyles.inputText }}></TextInput>
                        {email.length > 0 &&
                            <Image style={{ position: 'absolute', zIndex: 1, width: 15, height: 15, right: 15 }} source={isvalidEmail ? validateEmailicon : forbidenEmail}></Image>
                        }
                    </View>
                    <TextInput textContentType='password' secureTextEntry={true} value={pass} onChangeText={(text) => setPass(text)} placeholder='Créer un mot de passe' placeholderTextColor={colors.primaryYellow} style={{ ...sharedStyles.inputText, marginTop: 15}}></TextInput>
                    <TextInput textContentType='telephoneNumber' keyboardType="phone-pad" value={numberPhone} onChangeText={(text) => setNumberPhone(text)} placeholder='Numéto de téléphone' placeholderTextColor={colors.primaryYellow} style={{ ...sharedStyles.inputText, marginTop: 15}}></TextInput>
                    <Text style={{...sharedStyles.label, paddingTop: 15}}>En cliquant sur suivant, vous acceptez <Link navigateTo={'test'} text='termes de nos services'></Link> , et notre <Link navigateTo={'test'} text='politique de confidentialité'></Link>.</Text>

                </View>
           
        </SafeAreaView>
    );
}

  