import React from 'react';
import {  Text } from 'react-native';
import { colors } from '../../utils/colors';

export default function TextLinkComponent({ text, navigateTo }) {

    return (
            <Text onPress={navigateTo} style={{fontWeight: 'bold', fontSize: 16, color: colors.darkGreen, textDecorationLine: 'underline'}}>{text}</Text>
    );
}