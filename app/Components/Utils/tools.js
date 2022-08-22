import React from "react";
import { View, Image, Text } from "react-native";
import { colors } from "../../utils/colors";
import { sharedStyles } from "../../utils/styles";


    const Tr = ()=>{
        return(
        <View style={{...sharedStyles.bottomCaesura, width: '100%'}}></View>
        )
    }

    const SmallIcon = ({label}) => {
        return(
        <View style={{width: 100, height: 100, borderRadius: 4, backgroundColor: colors.secondaryColor, justifyContent: 'center', alignItems: "center"}}>
            <Image
                style={{width: 24, height: 24, resizeMode: 'contain'}}
                source = {require('../../assets/icon/blueCarrot.png')}
            />
            <Text style={{color:colors.darkGreen, width:'90%', textAlign: "center", fontSize: 12}}>{label}</Text>
        </View>
        )
    }


export {Tr, SmallIcon}

