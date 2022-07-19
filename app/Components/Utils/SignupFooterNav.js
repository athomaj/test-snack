import React from 'react';
import {  View, TouchableOpacity, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { sharedStyles } from '../../utils/styles';



//Importation dim'age de validation

export default function SignupFooterNav({ onPressContinue,  onPressBack, disabledButton }) {

   
//<Text style={{ marginTop: 10, fontSize: 13, color: colors.red }}>{error}</Text>
// <ActivityIndicator style={{ position: 'absolute', right: 15 }} animating={loading} color={'black'}></ActivityIndicator>
    return (
        <>
            <View style={{ alignSelf:'center', zIndex: 1, position: 'absolute', bottom: 10, flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <TouchableOpacity style={{width:44, height:44, borderRadius:22, backgroundColor: '#E6EFF7', alignItems: 'center', justifyContent: 'center'}} onPress={onPressBack}>
                <Image style={{resizeMode: 'contain',width: 20}} source={require('../../assets/icon/return_icon.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressContinue} disabled={disabledButton} style={{ width: 118, height: 44, borderRadius: 4, justifyContent:'center', alignItems:'center', backgroundColor: disabledButton ? colors.primaryYellowDisable : colors.primaryYellow }}>
                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>Suivant</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

  