import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export default function PublishFooterNav({ firstScreen, lastScreen, loading, onPressContinue, onPressBack, disabledButton }) {
    return (
        <>
            <View style={{ alignSelf: 'center', zIndex: 1, position: 'absolute', bottom: 0, flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10, backgroundColor: colors.white }}>
                {!firstScreen ?
                    <TouchableOpacity style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#E6EFF7', alignItems: 'center', justifyContent: 'center' }} onPress={onPressBack}>
                        <Image style={{ resizeMode: 'contain', width: 20 }} source={require('../../assets/icon/return_icon.png')}></Image>
                    </TouchableOpacity>
                    :
                    <View></View>
                }
                <TouchableOpacity onPress={onPressContinue} disabled={disabledButton} style={{ width: lastScreen ? 200 : 120, height: 44, borderRadius: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: disabledButton ? colors.grey : colors.thirdBlue }}>
                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>{lastScreen ? "Publier l'annonce" : "Suivant"}</Text>
                    {loading &&
                        <ActivityIndicator style={{ position: 'absolute', right: 10 }} hidesWhenStopped={true} animating={loading} color={'white'}></ActivityIndicator>
                    }
                </TouchableOpacity>
            </View>
        </>
    );
}