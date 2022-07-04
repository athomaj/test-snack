import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';

import { colors } from "../utils/colors";
import { districtDisplayData } from "../fakeData/districtDisplay";

export default function FilterComponent({ filters, closeModal, updateFilters }) {
    const [districtArray, setDistrictArray] = useState([]);
    const [isCheckedWeek, setCheckedWeek] = useState(false);
    const [isCheckedNextWeek, setCheckedNextWeek] = useState(false);
    const [isCheckedMonth, setCheckedMonth] = useState(false);
    const [isCheckedSearch, setCheckedSearch] = useState(false);
    const [isCheckedProposal, setCheckedProposal] = useState(false);

    React.useEffect(() => {
        if (filters) {
            setDistrictArray(JSON.parse(JSON.stringify(filters.districts)))
            setCheckedWeek(filters.thisWeek)
            setCheckedNextWeek(filters.nextWeek)
            setCheckedMonth(filters.nextMonth)
            setCheckedSearch(filters.search)
            setCheckedProposal(filters.proposal)
            return
        }
        createDistrictArray()
    }, [])

    function createDistrictArray() {
        const district = districtDisplayData.map((data, index) => {
            data["isChecked"] = false
            data["id"] = index
            return data
        })
        setDistrictArray(district)
    }

    function deleteAll() {
        setCheckedWeek(false)
        setCheckedNextWeek(false)
        setCheckedMonth(false)
        setCheckedSearch(false)
        setCheckedProposal(false)
        createDistrictArray()
    }

    function display() {
        const filteredData = districtArray.filter((item) => item.isChecked === true)
        if(!isCheckedWeek && !isCheckedNextWeek && !isCheckedMonth && !isCheckedSearch && !isCheckedProposal && filteredData.length === 0) {
            updateFilters(null)
            return
        }
        const filterData = {
            thisWeek: isCheckedWeek,
            nextWeek: isCheckedNextWeek,
            nextMonth: isCheckedMonth,
            search: isCheckedSearch,
            proposal: isCheckedProposal,
            districts: [...districtArray]
        }
        updateFilters(filterData)
    }

    function districtCheckbox(index) {
        const data = [...districtArray]
        data[index].isChecked = !data[index].isChecked
        setDistrictArray(data)
    }

    function changeProposal(index, value) {
        if (index === 0) {
            setCheckedProposal(value)
            if (value === true) {
                setCheckedSearch(false)
            }
            return
        }
        setCheckedSearch(value)
        if (value === true) {
            setCheckedProposal(false)
        }
    }

    const flatListKeyExtractor = React.useCallback((item) => "" + item.id, []);

    const renderItem = React.useCallback(
        ({ item, index }) =>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <Text style={{ fontSize: 12, width: 40, color: 'black' }}>{item.district}</Text>
                <Checkbox style={{ marginRight: 10 }} value={item.isChecked} onValueChange={() => districtCheckbox(index)} color={colors.lightPink} />
            </View>,
        [districtArray]
    );

    return (
        <View style={{ backgroundColor: colors.darkGrey, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: colors.grey, width: '94%', height: '94%', borderRadius: 20 }}>
                <View style={{ zIndex: 1, position: 'absolute', top: 0, height: 50, width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomColor: colors.black, borderBottomWidth: StyleSheet.hairlineWidth, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <Text style={{ width: '100%', textAlign: 'center', fontSize: 16, fontWeight: '600' }}>Filtres</Text>
                    <TouchableOpacity style={{ position: 'absolute', left: 20 }} onPress={closeModal}>
                        <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../assets/exitModal.png')}></Image>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ paddingTop: 50, paddingBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 40 }}>Où?</Text>
                        <FlatList
                            style={{ margin: 5, width: '100%' }}
                            // contentContainerStyle={{backgroundColor: 'red' }}
                            scrollEnabled={false}
                            data={districtArray}
                            numColumns={4}
                            keyExtractor={flatListKeyExtractor}
                            renderItem={renderItem}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ borderBottomColor: colors.black, borderBottomWidth: StyleSheet.hairlineWidth, width: '100%' }} opacity={0.5} />
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 40 }}>Quand?</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginBottom: 30, fontSize: 12, width: 150 }}>Cette semaine</Text>
                            <Checkbox style={{}} value={isCheckedWeek} onValueChange={setCheckedWeek} color={colors.lightPink} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginBottom: 30, fontSize: 12, width: 150 }}>Semaine prochaine</Text>
                            <Checkbox style={{}} value={isCheckedNextWeek} onValueChange={setCheckedNextWeek} color={colors.lightPink} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginBottom: 30, fontSize: 12, width: 150 }}>Mois prochain</Text>
                            <Checkbox style={{}} value={isCheckedMonth} onValueChange={setCheckedMonth} color={colors.lightPink} />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ borderBottomColor: colors.black, borderBottomWidth: StyleSheet.hairlineWidth, width: '100%' }} opacity={0.5} />
                    </View>
                    <View style={{ marginTop: 30, marginBottom: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 40 }}>Statut</Text>
                        <View style={{ marginLeft: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginBottom: 30, fontSize: 12, width: 150 }}>Voir les propositions</Text>
                                <Checkbox value={isCheckedProposal} onValueChange={(value) => changeProposal(0, value)} color={colors.lightPink} />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginBottom: 30, fontSize: 12, width: 150 }}>Voir les recherches</Text>
                                <Checkbox value={isCheckedSearch} onValueChange={(value) => changeProposal(1, value)} color={colors.lightPink} />
                            </View>
                        </View>
                    </View>
                    <View style={{ borderBottomColor: colors.black, borderBottomWidth: StyleSheet.hairlineWidth }} opacity={0.5} />
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: 30 }}>
                        <TouchableOpacity style={{ height: 50, width: 158, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} onPress={deleteAll}>
                            <Text style={{ fontSize: 16, textDecorationLine: 'underline', fontWeight: '500' }}>Tout effacer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: colors.primaryYellow, height: 50, width: 158, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} onPress={display}>
                            <Text style={{ fontSize: 16, textDecorationLine: 'underline', fontWeight: '500' }}>Afficher</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}