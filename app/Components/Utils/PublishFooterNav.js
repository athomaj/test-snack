import React from 'react';
import {  View, TouchableOpacity, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export default function PublishFooterNav({ onPressContinue,  onPressBack, disabledButton, updatecontext }) {

    function whenContinueIsPress(){
        if(updatecontext)
        {
            updatecontext
        }
        onPressContinue()
    }
//<Text style={{ marginTop: 10, fontSize: 13, color: colors.red }}>{error}</Text>
// <ActivityIndicator style={{ position: 'absolute', right: 15 }} animating={loading} color={'black'}></ActivityIndicator>
    return (
        <>
            <View style={{ alignSelf:'center', zIndex: 1, position: 'absolute', bottom: 10, flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 20}}>
                <TouchableOpacity style={{width:44, height:44, borderRadius:22, backgroundColor: '#E6EFF7', alignItems: 'center', justifyContent: 'center'}} onPress={onPressBack}>
                <Image style={{resizeMode: 'contain',width: 20}} source={require('../../assets/icon/return_icon.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => whenContinueIsPress()} disabled={disabledButton} style={{ width: 118, height: 44, borderRadius: 4, justifyContent:'center', alignItems:'center', backgroundColor: disabledButton ? colors.grey : colors.thirdBlue }}>
                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>Suivant</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}