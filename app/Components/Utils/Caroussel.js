import React from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, Text, FlatList, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../utils/colors';
import { sharedStyles } from '../../utils/styles';

/**
 * 
 * @param {*} data , Tableau d'Objet avec un attribut image prenant en valeur une URL 
 * @param {*} viewHeight, dimention en hauteur du carrousel
 * @returns 
 */
export default function Caroussel({ data, viewHeight }) {

    const [indexItemView, setIndexItemView] = React.useState(0)

    const selectedDot =
        (scrollPosition) => {
            const screenWith = Dimensions.get('window').width
            const numberOfItems = data.length
            const indexofitem = Math.abs((-(numberOfItems - 1) + ((screenWith * numberOfItems) - (scrollPosition + screenWith)) / (screenWith)))
            setIndexItemView(indexofitem)
        }

    const dotMap = data.map(
        (element) => {
            if (element.id === indexItemView) {
                return <View key={element.id} style={{ height: 10, marginHorizontal: 4, width: 10, borderRadius: 5, backgroundColor: colors.darkGreen }}></View>
            }
            else {
                return <View key={element.id} style={{ height: 8, marginHorizontal: 4, width: 8, borderRadius: 4, backgroundColor: colors.green1 }}></View>
            }
        }
    )

    const renderItem = React.useCallback(
        ({ item, index }) => {
            return (
                <View key={item.id} style={{ height: '100%', width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center' }} >
                    <Image
                        style={{ width: '100%', height: '100%', resizeMode: 'cover'}}
                        source={{uri: item.image}}
                    />
                </View>)
        },
        []
    );

    return (
            <View style={{ height: viewHeight, width: '100%' }}>
                <FlatList
                    data={data}
                    horizontal
                    renderItem={renderItem}
                    // contentContainerStyle={{width: '100%', height: '100%'}}
                    style={{ height: viewHeight, width: '100%' }}
                    pagingEnabled
                    //keyExtractor={flatListKeyExtractor}
                    horizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    onMomentumScrollEnd={(event) => selectedDot(event.nativeEvent.contentOffset.x)}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                />

                <View style={{ alignSelf: 'center', width: '80%', position: 'absolute', bottom: 10, alignItems: 'center' }}>
                    <View style={{ height: 10, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        {dotMap}
                    </View>
                </View>
            </View>
    );
}