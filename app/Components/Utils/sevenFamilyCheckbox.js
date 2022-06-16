import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';

export default function SevenFamillycheckBox({ updateFamily, selected, label, color }) {
    return (
        <TouchableOpacity onPressOut={updateFamily} style={{ height: 70, width: 70, paddingTop: 15, borderRadius: 35, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: color + '80', marginHorizontal: 5 }}>
            <Text style={{ width: 60, textAlign: 'center', textAlignVertical: 'center' }}>{label}</Text>
            {selected &&
                <Image style={{ resizeMode: 'contain', width: 20, position: 'absolute', right: 12, bottom: 3 }} source={require('../../assets/icon/validated.png')}></Image>
            }
        </TouchableOpacity>
    );
}
