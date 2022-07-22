import React, { Component } from 'react';
import { SafeAreaView, Image, Text, View, TouchableOpacity } from 'react-native';
import { sharedStyles } from '../../utils/styles';



export default function CompletProfil1({ navigation }) {

    React.useEffect(()=>{
        // console.log('SIGNUP CONTEXT =>',SignUpContext.signUpUser)
    })
  
    //SignUpStep1
    return (
        <SafeAreaView style={{ height: '100%', width: '100%', paddingHorizontal: 15, paddingTop: 106}}>
                
                <Image source={require('../../assets/onboarding/pictureOnboarding.png')} style={{ width:169, height:128, alignSelf: 'center', marginBottom: '20%',resizeMode: 'contain' }}/>
                <Text style={{...sharedStyles.h2, marginBottom: 15}}>Bienvenue dans la communauté Food</Text>
                <Text style={{...sharedStyles.shortText, marginBottom:25}}>Super vous êtes inscrit maintenant il est temps de configurer votre profil pour avoir plus de chance de recevoir et de participer à des évènements. </Text>
                

                <View style={{alignSelf: 'center' ,position: 'absolute', bottom: 0, width: '100%', alignItems: 'center', marginBottom: 15}}>
                    <TouchableOpacity onPress={() => navigation.navigate('UpdateProfil2')} style={{...sharedStyles.primaryButtonWithColor, marginBottom: 20}}>
                        <Text style={{...sharedStyles.textUnderPrimaryButton}}>Compléter votre profil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.replace('MainStack')}>
                        <Text style={{...sharedStyles.label}}>Passer pour le moment</Text>
                    </TouchableOpacity>
                </View>
           
        </SafeAreaView>
    );
}