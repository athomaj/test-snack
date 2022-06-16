import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image, View, ActivityIndicator, SafeAreaView, Text, TouchableOpacity  } from 'react-native';
import { colors } from '../../utils/colors';
import { useUserContext } from '../../context/UserContext';
import { sharedStyles, primaryButton, title} from '../../utils/styles';

export default function HeaderChapter({ text }) {

    return (
        <View style={{ height: 100, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <Image style={{ width: 60, height: 60, resizeMode: 'contain', marginBottom: '5%', marginTop: '5%'}} source={require('../../assets/logo.png')}></Image>
            <Text style={title.h1}>{text}</Text>
        </View>
    );
}