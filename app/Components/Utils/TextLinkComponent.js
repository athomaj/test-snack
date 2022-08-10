import React from 'react';
import {  Text } from 'react-native';

export default function TextLinkComponent({ text, navigateTo }) {

    return (
            <Text onPress={navigateTo} style={{fontWeight: '700', fontSize: 13, color: '#0A4072'}}>{text}</Text>
    );
}