import React from 'react';
import { View, Text, TouchableOpacity, Image  } from 'react-native';

export default function SevenFamillycheckBox({ updateFamily ,selected, label, color }){
    return (
            <TouchableOpacity onPressOut={updateFamily} style={{ height: 70, width: 70, display: 'flex', borderRadius:35, alignItems: 'center', justifyContent: 'center', backgroundColor: color+'80', marginHorizontal: 5, position:'relative'}}>
                <Text style={{height: 60, width:60, textAlign:'center', textAlignVertical:'center'}}>{label}</Text>
                {selected ? <Image style={{ resizeMode: 'contain', width: 25, position: 'absolute', right:5, bottom: 5}} source={require('../../assets/icon/validated.png')}></Image> : null}
            </TouchableOpacity>
    );
}
