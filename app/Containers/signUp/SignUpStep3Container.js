import React, { Component } from 'react';
import { SafeAreaView, TextInput, View, TouchableOpacity, Text, ActivityIndicator, Image, Switch, StyleSheet, Modal, Alert, Dimensions, FlatList, ScrollView } from 'react-native';
import { colors } from '../../utils/colors';
import { sharedStyles } from '../../utils/styles';
import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import Link from '../../Components/Utils/Link';
import {Picker} from '@react-native-picker/picker';
import { useSignUpContext } from '../../context/SignUpContext';
import citiesApi from '../../services/citiesApi';



export default function SignUpStep3Container({ navigation }) {

    const SignUpContext = useSignUpContext();
    const [citySelected, setCitySelected] = React.useState(null)
    const [city, setcity] = React.useState(null)

    const CITYS = [
        { 
        name : 'Marseille',
        id : 1,
        arrondissements: [
            '13001',
            '13002',
            '13003',
            '13004',
            '13005',
            '13006',
            '13007',
            '13008',
            '13009',
            '13010',
            '13011',
            '13012',
            '13014',
            '13015',
            '13016',
            ]
        },
        { 
        name: 'Paris',
        id: 2,
        arrondissements: [
            '75101',
            '75102',
            '75103',
            '75104',
            '75104',
            '75106',
            '75107',
            '75108',
            '75109',
            '75110',
            '75111',
            '75112',
            '75113',
            '75114',
            '75115',
            '75116',
            '75117',
            '75118',
            '75119',
            '75120',
            ]
        },
        { 
        name: 'Lion',
        id: 3,
        arrondissements: [
            '13001',
            '13002',
            '13003',
            '13004',
            '13005'
            ]
        },
        { 
        name: 'Bordeaux',
        id: 4,
        arrondissements: [
            '13001',
            '13002',
            '13003',
            '13004',
            '13005'
            ]
        },
        { 
        name: 'Montpellier',
        id: 5,
        arrondissements: [
            '13001',
            '13002',
            '13003',
            '13004',
            '13005'
            ]
        },
        { 
        name: 'Toulouse',
        id: 6,
        arrondissements: [
            '13001',
            '13002',
            '13003',
            '13004',
            '13005'
            ]
        },
    ]
    const [buttonDisable, setDisabledButton] = React.useState(true)
    const [selectedAroddissement, setselectedAroddissement] = React.useState(null);
    const WIDTHCONTAINER = (Dimensions.get('window').width/2)-21;
    const [selectedcity, setSelectedcity] = React.useState([])

   const getAllCities = async () => {
        const citiesAll = await citiesApi.getAllCities();
        citiesAll?.data ? setcity(citiesAll.data) : null
        console.log(citiesAll.data[0].attributes.districts.data[0].attributes.name)
    }
    React.useEffect(()=>{
        getAllCities()
    },[])

    React.useEffect(()=>{
        setSelectedcity(SelectPicker)
    },[citySelected])

    const SelectPicker = () => {
        if(citySelected)
        {
        const cityOnselected = [...citySelected.attributes.districts.data]
        const arrondissements = cityOnselected.map(element =>{
            return <Picker.Item style={{ color: colors.primaryYellow}} label={element.attributes.name} value={element.id} />
        })
        return(
            arrondissements
        )
        }
    };
    React.useEffect(()=>{
        setDisabledButton(selectedAroddissement ? false : true) 
    })
    
  
    const renderItem = React.useCallback(
        ({ item, index }) => {
            return(
            <TouchableOpacity onPress={() => setCitySelected(item)} style={{backgroundColor: '#E6EFF7', height: 87, width:WIDTHCONTAINER, borderRadius: 4, marginBottom: 12}}>
                { citySelected && item.attributes.name === citySelected.attributes.name && 
                <Image source={require('../../assets/icon/validate_icon.png')} style={{position: 'absolute', top:8, right:8, width: 21, height: 21,}} />
                }
                <Text style={{...sharedStyles.shortText, position: 'absolute', bottom:0, left:0, paddingLeft:10, paddingBottom:10}}>{item.attributes.name}</Text>
            </TouchableOpacity>)},
        [citySelected]
    );
    //SignUpStep1
    return (
        <SafeAreaView style={{ height: '100%', width: '100%', paddingHorizontal: 15, paddingTop: 80 }}>
                <SignupFooterNav disabledButton={buttonDisable} onPressBack={navigation.goBack} onPressContinue={() => navigation.navigate('SignUpStep4')} updatecontext={() => SignUpContext.updateSignUp3(selectedAroddissement)}></SignupFooterNav>


                <ScrollView style={{ width: '100%', height: '100%'}} scrollEnabled={false}>
                    <Text style={{...sharedStyles.h2, width: '100%'}}>Où habites-tu ? </Text>
                    <Text style={{...sharedStyles.shortText, height:55}}>Participe avec nous à développer la vie du quartier de ta ville.</Text>
                    <FlatList
                    data={city}
                    renderItem={renderItem}
                    style={{ width: '100%'}}
                    horizontal={false}
                    numColumns= {2}
                    keyExtractor={item => item.id}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                />
                <Text style={{...sharedStyles.label, paddingTop: 15, marginBottom: 25}}>FoodFood est en plein développement. Si tu ne trouves pas ta ville n’hésite pas à la <Link navigateTo={'test'} text='suggérer ici'></Link>. </Text>

                { citySelected &&
                <>
                <Text style={{...sharedStyles.h3, marginBottom: 10}}>Quel est ton quartier ?</Text>
                <Picker style={{...sharedStyles.inputText}}
                selectedValue={selectedAroddissement}
                itemStyle={{ textAlign:'center'}}
                onValueChange={(itemValue, itemIndex) =>
                    setselectedAroddissement(itemValue)
                }>
                {selectedcity}
                </Picker>
                </>
                }
                </ScrollView>
           
        </SafeAreaView>
    );
}

  