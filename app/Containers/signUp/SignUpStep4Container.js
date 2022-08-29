import React from 'react';
import { SafeAreaView, Image, Text, View } from 'react-native';

import SignupFooterNav from '../../Components/Utils/SignupFooterNav';

import { isIphoneX } from '../../utils/isIphoneX';
import { sharedStyles } from '../../utils/styles';

export default function SignUpStep3Container({ navigation }) {

    return (
        <View style={{ height: '100%', width: '100%' }}>
            <SafeAreaView style={{ height: '100%', width: '100%' }}>
                <View style={{...sharedStyles.wrapperHeaderSpace, paddingHorizontal: 15}}>
                    <Image source={require('../../assets/onboarding/pictureOnboarding.png')} style={{height: '50%', alignSelf: 'center', resizeMode: 'contain' }} />
                    <Text style={{ ...sharedStyles.h2, marginBottom: 15 }}>Trouvez vos parrains</Text>
                    <Text style={{ ...sharedStyles.shortText, marginBottom: 25 }}>Food Food est accessible sur recommandation. Pour devenir membre, vous devez obtenir 3 parrainages.</Text>
                    <Text style={{ ...sharedStyles.shortText }}>Pour vous aider à trouver des parrains, nous croisons vos contacts avec la liste des membres. C’est tout !</Text>
                </View>
            </SafeAreaView>

            <SignupFooterNav
                title={"Suivant"}
                disabledButton={false}
                canGoBack={false}
                onPressBack={navigation.goBack}
                onPressContinue={() => navigation.navigate('SearchContact')}
                updatecontext={() => console.log("continue")}
            >
            </SignupFooterNav>
        </View>
    );
}

