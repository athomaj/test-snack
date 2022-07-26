import React, { Component } from 'react';
import { SafeAreaView, Image, Text, View, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import { sharedStyles } from '../../utils/styles';
import { useUserContext } from '../../context/UserContext';
import kitchenApi from '../../services/kitchenApi';



export default function CompletProfil2({ navigation }) {

    const userContext = useUserContext();
    const [buttonDisable, setDisabledButton] = React.useState(true)
    const [typeOfCooks, setTypeOfCooks] = React.useState([])
    const [data, setData] = React.useState({})
    const [allKitchens, setAllKitchens] = React.useState(null)
    
    async function getAllKitchens(){
        const resultOfData = await kitchenApi.getAllKitchen();
        resultOfData?.data ? setAllKitchens(resultOfData.data) : null
    }

    React.useEffect(() => {
        getAllKitchens()
    },[])

    React.useEffect(()=>{
        typeOfCooks.length > 0 ? setDisabledButton(false) : setDisabledButton(true);
        setData({"kitchen": typeOfCooks})
    },[typeOfCooks])


    function updateTypeOfCooks(item){
        const modifyArray =  typeOfCooks?.length > 0 ? [...typeOfCooks] : []
       if(modifyArray.length > 0 )
       {
           modifyArray.includes(item.id) ? modifyArray.splice(modifyArray.indexOf(item.id), 1)  : modifyArray.push(item.id)

       }
       else  modifyArray.push(item.id)
       setTypeOfCooks(modifyArray)
   }


    const renderItem = React.useCallback(
        ({item, index}) => {
            return(
                <TouchableOpacity onPress={() => updateTypeOfCooks(item)} style={{...sharedStyles.inputText, marginBottom:13, justifyContent: 'center'}}><Text style={{...sharedStyles.shortText, textAlignVertical: 'center'}}>{item.attributes.name}</Text>
                    { typeOfCooks && typeOfCooks.includes(item.id) &&
                        <Image source={require('../../assets/icon/validate_icon.png')} style={{position: 'absolute', right:8, width: 21, height: 21,}} />
                    }
                </TouchableOpacity>
            )},[typeOfCooks])
  
    //SignUpStep1
    return (
        <SafeAreaView style={{ height: '100%', width: '100%',paddingTop: 96, paddingHorizontal: 15, backgroundColor: 'white'}}>
            <SignupFooterNav syle={{backgroundColor: 'white'}} disabledButton= {buttonDisable} onPressBack={navigation.goBack} onPressContinue={() => navigation.navigate('UpdateProfil3')} updatecontext={() =>userContext.updateUserInformation(data)}></SignupFooterNav>
                
                <FlatList
                ListHeaderComponentStyle={{backgroundColor: 'white'}}
                ListHeaderComponent={<View>
                    <Text style={{...sharedStyles.h2, marginBottom: 15}}>Type de cuisine</Text>
                    <Text style={{...sharedStyles.shortText, marginBottom:25}}>Quoi que vous aimiez, vous le trouverez ici. </Text>
                </View>}
                style={{ width: '100%', height: '100%'}}
                contentContainerStyle={{paddingBottom: 80}}
                data={allKitchens}
                renderItem={renderItem}
                stickyHeaderIndices={[0]}
                />
        </SafeAreaView>
    );
}