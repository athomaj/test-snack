import React from 'react';
import { TouchableOpacity, Text, Image, View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../../utils/colors';
import { isIphoneX } from '../../utils/isIphoneX';

//Importation d'Zimage de validation

export default function SignupFooterNav({ title, errorMessage, onPressContinue, onPressBack, disabledButton, updatecontext, loading, canGoBack }) {

    function whenContinueIsPress() {
        if (updatecontext) {
            updatecontext()
        }
        onPressContinue()
    }

    return (
        <>
            <LinearGradient style={{ height: isIphoneX() ? 100 : 80, paddingTop: 20, paddingHorizontal: 10, alignSelf: 'center', zIndex: 1, position: 'absolute', bottom: 0, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}
                colors={[`${colors.backgroundColor}4D`, colors.backgroundColor]}
                endPoint={[0, 0.3]}
            // style={styles.background}
            >
                {errorMessage &&
                    <View style={{ position: 'absolute', top: 0, right: 10 }}>
                        <Text style={{ color: 'red' }}>{errorMessage}</Text>
                    </View>
                }
                {canGoBack ?
                    <TouchableOpacity style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} onPress={onPressBack}>
                        <Image style={{ resizeMode: 'contain', width: 20 }} source={require('../../assets/icon/return_icon.png')}></Image>
                    </TouchableOpacity>
                    :
                    <View></View>
                }
                <TouchableOpacity onPress={whenContinueIsPress} disabled={disabledButton} style={{ width: 130, height: 44, borderRadius: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: disabledButton ? `${colors.orange1}33` : colors.orange1 }}>
                    {loading &&
                        <ActivityIndicator style={{ position: 'absolute', right: 5 }} animating={loading} hidesWhenStopped={true} color={"white"}></ActivityIndicator>
                    }
                    <Text style={{ fontSize: 16, color: colors.darkGreen, fontWeight: 'bold' }}>{title}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </>
    );
}

