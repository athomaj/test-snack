import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { colors } from "../utils/colors";
import Checkbox from 'expo-checkbox';
import { districtDisplayData } from "../fakeData/districtDisplay";

export default function FilterComponent ({setModalVisible}){
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

    return (
        <View style={{backgroundColor: colors.darkGrey, width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
            <View style={{backgroundColor: colors.grey, width:'94%', height:'94%', borderRadius:20}}>
                <Text style={{width:'100%', textAlign:'center', fontSize:16, fontWeight:'600', top:20}}>Filtres</Text>
                <TouchableOpacity onPress={setModalVisible}>
                    <Image style={{width: 20, height: 20, left:20}} source={require('../assets/exitModal.png')}></Image>
                </TouchableOpacity>
                <View style={{ borderBottomColor: colors.black, borderBottomWidth: StyleSheet.hairlineWidth, top:15}} opacity= {0.5}/>
                <View style={{top: 60, left: 25}}>
                    <Text style={{fontSize:16, fontWeight:'500'}}>Où?</Text>
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
                <View style={{alignItems: 'center', top:200}}>
                    <View style={{ borderBottomColor: colors.black, borderBottomWidth: StyleSheet.hairlineWidth, top:15, width:'70%'}} opacity= {0.5}/>
                </View>
                <View style={{top:250, left:25}}>
                    <Text style={{fontSize:16, fontWeight:'500'}}>Quand?</Text>
                    <View style={{top:25, left:12}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginBottom:20, fontSize:12}}>Cette semaine</Text>
                            <Checkbox style={{left:150, position: 'absolute'}} value={isCheckedWeek} onValueChange={setCheckedWeek}/>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginBottom:20, fontSize:12}}>Semaine prochaine</Text>
                            <Checkbox style={{left:150, position: 'absolute'}} value={isCheckedNextWeek} onValueChange={setCheckedNextWeek}/>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginBottom:20, fontSize:12}}>Mois prochain</Text>
                            <Checkbox style={{left:150, position: 'absolute'}} value={isCheckedMonth} onValueChange={setCheckedMonth}/>
                        </View>
                    </View>
                </View>
                <View style={{alignItems: 'center', top:300}}>
                    <View style={{ borderBottomColor: colors.black, borderBottomWidth: StyleSheet.hairlineWidth, top:15, width:'70%'}} opacity= {0.5}/>
                </View>
                <View style={{top:350, left:25}}>
                    <Text style={{fontSize:16, fontWeight:'500'}}>Statut</Text>
                    <View style={{top:25, left:12}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginBottom:20, fontSize:12}}>Voir les propositions</Text>
                            <Checkbox style={{left:150, position: 'absolute'}} value={isCheckedProposal} onValueChange={setCheckedProposal}/>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginBottom:20, fontSize:12}}>Voir les recherches</Text>
                            <Checkbox style={{left:150, position: 'absolute'}} value={isCheckedSearch} onValueChange={setCheckedSearch}/>
                        </View>
                    </View>
                </View>
                <View style={{ borderBottomColor: colors.black, borderBottomWidth: StyleSheet.hairlineWidth, top:420}} opacity= {0.5}/>
                <View style={{top:435, flexDirection:'row', width:'100%', justifyContent:'center'}}>
                    <TouchableOpacity style={{height: 50, width: 158, justifyContent:'center'}}>
                        <Text style={{left: 30,fontSize:16, textDecorationLine: 'underline', fontWeight:'500'}} onPress={deleteAll}>Tout effacer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: colors.primaryYellow, height: 50, width: 158, borderRadius:20, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:16, textDecorationLine: 'underline', fontWeight:'500'}}>Afficher</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}