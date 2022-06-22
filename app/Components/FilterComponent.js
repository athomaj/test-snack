import React from "react";
import { View, TouchableOpacity, SafeAreaView, Text, Image, ActivityIndicator } from 'react-native';
import { colors } from "../utils/colors";

export default function FilterComponent ({setModalVisible}){


    return (
        <View style={{backgroundColor: colors.darkGrey, width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
            <View style={{backgroundColor: colors.grey, width:'96%', height:'96%', borderTopEndRadius:20, borderTopStartRadius:20}}>
                <TouchableOpacity onPress={setModalVisible}>
                    <Image style={{width: 20, height: 20, left:10, top:10}} source={require('../assets/exitModal.png')}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}