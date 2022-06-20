import React from 'react';
import { Image, View, Text  } from 'react-native';
import sharedStyles from '../../utils/styles';

export default function HeaderChapter({ text }) {

    return (
        <View style={{ marginTop: 30, height: 100, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <Image style={{ width: 60, height: 60, resizeMode: 'contain', marginBottom: '5%', marginTop: '5%'}} source={require('../../assets/logo.png')}></Image>
            <Text style={sharedStyles.title.h1}>{text}</Text>
        </View>
    );
}