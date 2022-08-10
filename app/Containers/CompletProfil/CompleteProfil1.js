import React from 'react';
import { SafeAreaView, Image, Text, View, TouchableOpacity } from 'react-native';

import { isIphoneX } from '../../utils/isIphoneX';
import { sharedStyles } from '../../utils/styles';

export default function CompletProfil1({ navigation }) {

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', alignItems: 'flex-start' }}>
            <View style={{ width: '100%', height: '100%', alignItems: 'center', paddingHorizontal: 10, paddingTop: isIphoneX() ? 40 : 20 }}>
                <Image source={require('../../assets/onboarding/pictureOnboarding.png')} style={{ width: 180, height: 130, alignSelf: 'center', resizeMode: 'contain' }} />
                <Text style={{ ...sharedStyles.h2, marginBottom: 15, width: '100%', marginTop: 40 }}>Bienvenue dans la communauté Food</Text>
                <Text style={{ ...sharedStyles.shortText, marginBottom: 25 }}>Super vous êtes inscrit maintenant il est temps de configurer votre profil pour avoir plus de chance de recevoir et de participer à des évènements. </Text>


                <View style={{ alignSelf: 'center', position: 'absolute', bottom: isIphoneX() ? 20 : 10, width: '90%', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.push('UpdateProfil2')} style={{ ...sharedStyles.primaryButtonWithColor, marginBottom: 10 }}>
                        <Text style={{ ...sharedStyles.textUnderPrimaryButton }}>Compléter votre profil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.replace('MainStack')}>
                        <Text style={{ ...sharedStyles.label }}>Passer pour le moment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}