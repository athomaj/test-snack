import React from 'react';
import { SafeAreaView, Image, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/colors';

import { isIphoneX } from '../../utils/isIphoneX';
import { sharedStyles } from '../../utils/styles';

export default function CompletProfil1({ navigation }) {

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', alignItems: 'flex-start', backgroundColor: colors.backgroundColor }}>
            <View style={{...sharedStyles.wrapperHeaderSpace, paddingHorizontal: 10, paddingTop: isIphoneX() ? 40 : 20 }}>
                <Text style={{ ...sharedStyles.bigTitle, marginBottom: 15, width: '100%', marginTop: 40 }}>Bienvenue chez Food Food !</Text>
                <Text style={{ ...sharedStyles.shortText, marginBottom: 25 }}>Super tu es inscrit ! Maintenant il est temps de renseigner ton profil pour avoir plus de chances de trouver les membres et les évenements qui te correspondent. </Text>


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