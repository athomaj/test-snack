import React from 'react';
import { SafeAreaView, Text, FlatList, Image, View } from 'react-native';
import { feedHomeData } from '../fakeData/feedHome';
import { colors } from '../utils/colors';
import { sharedStyles } from '../utils/styles';

export default MainContainer = ({ navigation }) => {

    React.useEffect(() => {
        console.log('Main')
    }, [])

    const flatListKeyExtractor = React.useCallback((item) => "" + item.id, []);

    const renderItem = React.useCallback(
        ({ item, index }) =>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ ...sharedStyles.shadow, height: 160, width: '100%', backgroundColor: 'white', marginBottom: 20, borderRadius: 10 }}>
                    <Image style={{ height: 100, width: '100%', resizeMode: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} source={require('../assets/paysage.jpeg')}></Image>
                    <View style={{ height: 60, width: '100%', paddingHorizontal: 10, paddingTop: 10 }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.black }}>{item.title}</Text>
                        <Text style={{ fontSize: 13, fontWeight: 'normal', color: colors.black }}>{item.description}</Text>
                    </View>
                </View>
            </View>,
        []
    );

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <FlatList
                ListHeaderComponent={(
                    <View style={{ height: 80, backgroundColor: colors.white, paddingLeft: 20, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 26, fontWeight: 'bold', color: "black" }}>Page d'accueil</Text>
                    </View>
                )}
                data={feedHomeData}
                renderItem={renderItem}
                keyExtractor={flatListKeyExtractor}
                style={{ height: '100%', width: '100%' }}
                stickyHeaderIndices={[0]}
            />
        </SafeAreaView>
    );
}