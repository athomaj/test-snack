import React from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, Text, FlatList, Dimensions } from 'react-native';
import { colors } from '../utils/colors';
import { onBoardingData } from '../utils/onBoardingData';
import { sharedStyles } from '../utils/styles';

export default function OnboardingContainer({ navigation, route }) {

    const [indexItemView, setIndexItemView] = React.useState(0)

    const selectedDot =
        (scrollPosition) => {
            const screenWith = Dimensions.get('window').width
            const numberOfItems = onBoardingData.length
            const indexofitem = Math.abs((-(numberOfItems - 1) + ((screenWith * numberOfItems) - (scrollPosition + screenWith)) / (screenWith)))
            setIndexItemView(indexofitem)
        }

    const dotMap = onBoardingData.map(
        (element) => {
            if (element.id === indexItemView) {
                return <View key={element.id} style={{ height: 10, marginHorizontal: 4, width: 10, borderRadius: 5, backgroundColor: colors.darkGreen }}></View>
            }
            else {
                return <View key={element.id} style={{ height: 8, marginHorizontal: 4, width: 8, borderRadius: 4, backgroundColor: colors.darkGreen, opacity: 0.6 }}></View>
            }
        }
    )

    const renderItem = React.useCallback(
        ({ item, index }) => {
            return (
                <View key={item.id} style={{ height: '80%', width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 15}} >
                    <Image
                        style={{ width: '100%', height:390, resizeMode: 'contain', bottom: 80, position: 'absolute'}}
                        source={item.image}
                    />
                    <Text style={{...sharedStyles.h1 }}>{item.titre}</Text>
                    <Text style={{...sharedStyles.p, textAlign: 'center', width: '100%', paddingHorizontal: 15, lineHeight: 19}}>{item.description}</Text>
                </View>)
        },
        []
    );

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: '#E6EFF7', justifyContent: 'flex-end', backgroundColor: colors.backgroundColor}}>
            <View style={{ height: '100%', width: '100%' }}>
                <Image source={require('../assets/logo.png')} style={{position: 'absolute', top: '7%', width: '30%', height: 50, resizeMode: 'contain', alignSelf: 'center', zIndex: 1}}/>
                <FlatList
                    data={onBoardingData}
                    horizontal
                    renderItem={renderItem}
                    // contentContainerStyle={{width: '100%', height: '100%'}}
                    style={{ height: '100%', width: '100%' }}
                    pagingEnabled
                    //keyExtractor={flatListKeyExtractor}
                    horizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    onMomentumScrollEnd={(event) => selectedDot(event.nativeEvent.contentOffset.x)}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                />

                <View style={{ alignSelf: 'center', width: '80%', height: '20%', position: 'absolute', bottom: 10, alignItems: 'center' }}>
                    <View style={{ height: 10, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        {dotMap}
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUpStep1')} style={{ ...sharedStyles.primaryButtonWithColor, marginBottom: 10 }}>
                        <Text style={{...sharedStyles.textUnderPrimaryButton}}>Démarrer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login', { isLogin: true })} style={{ ...sharedStyles.secondaryButton, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: colors.darkGreen }}>Déjà membre ?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}


