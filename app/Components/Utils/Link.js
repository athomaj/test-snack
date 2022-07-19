import React from 'react';
import {  View, TouchableOpacity, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { sharedStyles } from '../../utils/styles';



//Importation dim'age de validation

export default function Link({ text, navigateTo }) {

   
//<Text style={{ marginTop: 10, fontSize: 13, color: colors.red }}>{error}</Text>
// <ActivityIndicator style={{ position: 'absolute', right: 15 }} animating={loading} color={'black'}></ActivityIndicator>
//invalide props
    return (
            <Text style={{fontWeight: '700', fontSize: 13, color: '#0A4072'}}>{text}</Text>
    );
}