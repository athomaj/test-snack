import React, { Component } from 'react';
import { SafeAreaView, Image, Text } from 'react-native';
import { sharedStyles } from '../../utils/styles';
import SignupFooterNav from '../../Components/Utils/SignupFooterNav';



export default function SignUpStep3Container({ navigation }) {

    

    React.useEffect(()=>{
    },[])

  
    //SignUpStep1
    return (
        <SafeAreaView style={{ height: '100%', width: '100%', paddingHorizontal: 15, paddingTop: 106}}>
                <SignupFooterNav disabledButton={false} onPressBack={navigation.goBack} onPressContinue={() => navigation.navigate('SignUpStep4')}></SignupFooterNav>
                <Image source={require('../../assets/onboarding/pictureOnboarding.png')} style={{ width:169, height:128, alignSelf: 'center', marginBottom: '20%',resizeMode: 'contain' }}/>
                <Text style={{...sharedStyles.h2, alignSelf: 'center', marginBottom: 15}}>Trouvez vos parrains</Text>
                <Text style={{...sharedStyles.shortText, marginBottom:25}}>Food Food est accessible sur recommandation. Pour devenir membre, vous devez obtenir 3 parrainages.</Text>
                <Text style={{...sharedStyles.shortText}}>Pour vous aider à trouver des parrains, nous croisons vos contacts avec la liste des membres. C’est tout !</Text>
           
        </SafeAreaView>
    );
}

  