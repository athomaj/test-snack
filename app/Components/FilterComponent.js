import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { colors } from "../utils/colors";
import Checkbox from 'expo-checkbox';
import { districtDisplayData } from "../fakeData/districtDisplay";

export default function FilterComponent ({setModalVisible, filter}){
    const [districtArray, setDistrictArray] = useState([]);

    const [isCheckedWeek, setCheckedWeek] = useState(false);
    const [isCheckedNextWeek, setCheckedNextWeek] = useState(false);
    const [isCheckedMonth, setCheckedMonth] = useState(false);
    const [isCheckedSearch, setCheckedSearch] = useState(false);
    const [isCheckedProposal, setCheckedProposal] = useState(false);

    React.useEffect(() => {
        const district = districtDisplayData.map(data => {
            data["isChecked"] = false
            return data
        })
        setDistrictArray(district)
    }, [])

    function deleteAll(){
        setCheckedWeek(false)
        setCheckedNextWeek(false)
        setCheckedMonth(false)
        setCheckedSearch(false)
        setCheckedProposal(false)
    }

    function display(){
        if(isCheckedSearch != isCheckedProposal){
            filter({
                search: isCheckedSearch,
                proposal : isCheckedProposal
            })
        }
        filter({
            thisWeek: isCheckedWeek,
            nextWeek: isCheckedNextWeek,
            nextMonth: isCheckedMonth
        })
        setModalVisible(false)
    }

    return (
        <View style={{backgroundColor: colors.darkGrey, width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
            <View style={{backgroundColor: colors.grey, width:'94%', height:'94%', borderRadius:20}}>
                <View style={{ zIndex: 1, position: 'absolute', top: 0, height: 50, width: '100%', justifyContent: 'center', alignItems: 'center',  borderBottomColor: colors.black, borderBottomWidth: StyleSheet.hairlineWidth, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                    <Text style={{width:'100%', textAlign:'center', fontSize:16, fontWeight:'600'}}>Filtres</Text>
                    <TouchableOpacity style={{position: 'absolute', left: 20}} onPress={setModalVisible}>
                        <Image style={{width: 20, height: 20, resizeMode: 'contain'}} source={require('../assets/exitModal.png')}></Image>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{width: '100%', height: '100%', paddingTop: 50}} contentContainerStyle={{paddingLeft: 20, paddingRight: 20}}>
                    <View style={{height: 200}}>
                        <Text style={{fontSize:16, fontWeight:'500', marginTop: 20}}>Où?</Text>
                        {/* <View style={{top: 40, left: 12}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginRight:10, fontSize:12}}>13001</Text>
                                <Checkbox style={{marginRight:10, marginBottom:10}} value={isChecked} onValueChange={setChecked}/>
                                <Text style={{marginRight:10, fontSize:12}}>13002</Text>
                                <Checkbox style={{marginRight:10}} value={isChecked} onValueChange={setChecked}/>
                                <Text style={{marginRight:10, fontSize:12}}>13003</Text>
                                <Checkbox style={{marginRight:10}} value={isChecked} onValueChange={setChecked}/>
                                <Text style={{marginRight:10, fontSize:12}}>13004</Text>
                                <Checkbox style={{marginRight:10}} value={isChecked} onValueChange={setChecked}/>
                            </View>
                        </View> */}
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <View style={{ borderBottomColor: colors.black, borderBottomWidth: StyleSheet.hairlineWidth, width:'100%'}} opacity= {0.5}/>
                    </View>
                    <View style={{marginTop: 30}}>
                        <Text style={{fontSize:16, fontWeight:'500', marginBottom: 40}}>Quand?</Text>
                        <View style={{marginLeft: 20}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginBottom: 30, fontSize: 12, width: 150}}>Cette semaine</Text>
                                <Checkbox style={{}} value={isCheckedWeek} onValueChange={setCheckedWeek} color={colors.lightPink}/>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginBottom: 30, fontSize: 12, width: 150}}>Semaine prochaine</Text>
                                <Checkbox style={{}} value={isCheckedNextWeek} onValueChange={setCheckedNextWeek} color={colors.lightPink}/>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginBottom: 30, fontSize:12, width: 150}}>Mois prochain</Text>
                                <Checkbox style={{}} value={isCheckedMonth} onValueChange={setCheckedMonth} color={colors.lightPink}/>
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <View style={{ borderBottomColor: colors.black, borderBottomWidth: StyleSheet.hairlineWidth, width:'100%'}} opacity= {0.5}/>
                    </View>
                    <View style={{marginTop: 30, marginBottom: 20}}>
                        <Text style={{fontSize:16, fontWeight:'500', marginBottom: 40}}>Statut</Text>
                        <View style={{marginLeft: 20}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginBottom: 30, fontSize: 12, width: 150}}>Voir les propositions</Text>
                                <Checkbox value={isCheckedProposal} onValueChange={setCheckedProposal} color={colors.lightPink}/>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginBottom: 30, fontSize: 12, width: 150}}>Voir les recherches</Text>
                                <Checkbox value={isCheckedSearch} onValueChange={setCheckedSearch} color={colors.lightPink}/>
                            </View>
                        </View>
                    </View>
                    <View style={{ borderBottomColor: colors.black, borderBottomWidth: StyleSheet.hairlineWidth}} opacity= {0.5}/>
                    <View style={{flexDirection:'row', width:'100%', justifyContent:'center', marginTop: 30}}>
                        <TouchableOpacity style={{height: 50, width: 158, borderRadius:20, justifyContent:'center', alignItems:'center'}}  onPress={deleteAll}>
                            <Text style={{fontSize:16, textDecorationLine: 'underline', fontWeight:'500'}}>Tout effacer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor: colors.primaryYellow, height: 50, width: 158, borderRadius:20, justifyContent:'center', alignItems:'center'}}  onPress={display}>
                            <Text style={{fontSize:16, textDecorationLine: 'underline', fontWeight:'500'}}>Afficher</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}