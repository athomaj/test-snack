import React from 'react';
import { Image, Text, View } from 'react-native';
import moment from 'moment';

import { colors } from '../utils/colors';
import { sharedStyles } from '../utils/styles';

export function PostComponent({ item, index}) {
    return (
        <View style={{ paddingHorizontal: 20, paddingTop: index === 0 ? 20 : 0 }}>
            <View style={{ ...sharedStyles.shadow, height: 260, width: '100%', backgroundColor: 'white', marginBottom: 20, borderRadius: 10 }}>
                <Image style={{ height: 130, width: '100%', resizeMode: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} source={require('../assets/paysage.jpeg')}></Image>
                <View style={{ backgroundColor: colors.white, position: 'absolute', right: 0, padding: 10, borderRadius: 10 }}>{<Text style={{ fontSize: 12 }}>{item.attributes.isSearch === false ? 'Proposition' : 'Recherche'}</Text>}</View>
                <View style={{ backgroundColor: colors.white, paddingHorizontal: 10, paddingTop: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.black, textTransform: 'uppercase', fontWeight: '400' }}>{item.attributes.category.data.attributes.name}</Text>
                    <Text style={{ width: 245, height: 30, fontSize: 25, fontWeight: 'bold', color: colors.black }}>{item.attributes.title}</Text>
                    <Text style={{ marginTop: 10, fontSize: 12, fontWeight: 'bold', color: colors.black }}>{moment((item.attributes.date)).format('DD/MM/YYYY') + ' - ' + (item.attributes.address) + (item.attributes.isSearch === false ? ' - ' + (item.attributes.seats) + ' places' : '')}</Text>
                    <Text numberOfLines={2} style={{ height: 30, width: '100%', marginTop: 10, fontSize: 12, fontWeight: 'normal', color: colors.black }}>{item.attributes.description}</Text>
                </View>
            </View>
        </View>
    )
}