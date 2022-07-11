import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useUserContext } from '../context/UserContext';
import userApi from '../services/userApi';
import { colors } from '../utils/colors';
import { sharedStyles } from '../utils/styles';


export default function SearchContactContainer({ closeModal }) {

    const userContext = useUserContext()
    const [memberMatch, setMemberMatch ] = React.useState([])//Tableau des membres en relation avec l'user
    const [selectedSponsor, setSelectedSponsor] = React.useState([]) //Sponsor ayant reçu l'invitation
    const [SendAsk, setSendAsk] = React.useState(false) //Si un 

  React.useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const contact = data;
        //trate un tableau avec liste des téléphone au bon format
          const listPhoneNumber = contact.map( element => {
            const elementNativ = element.phoneNumbers[0].number
            const elementResult = elementNativ.split(" ").join(""); 
             return elementResult.slice(1)
          })

          const usersContactPhone = await userApi.getUsersContactPhone()
        //Récupère seulement les utilisateurs répertoriés
            const MemberSponsor = usersContactPhone.filter(element => {
                let result = false
                listPhoneNumber.forEach(number => {  
                    if(element.numberPhone === number){
                        result = true
                    }
                })
                return result
            })
        setMemberMatch(MemberSponsor)
        //Traite les sponsor ayant déjà eu la demande
        arrayMemberInPending = []
        MemberSponsor.forEach( memberObject => {
            memberObject.pendings.length > 0 ? memberObject.pendings.forEach(member => {
                if(member.id === userContext.authState.user.id)
                {
                    arrayMemberInPending.push(memberObject.id)
                }
            }) : null 
        })
        setSelectedSponsor(arrayMemberInPending)
        }
      }
    })();
  }, []);

//   React.useEffect(() => {
//     console.log('MEMBERMATCH----------------->', memberMatch)
//   },[memberMatch])

  async function addSelectedSponsor(value, username){
    const arrayToEdit = [...selectedSponsor]
    //Ajout du sponsors selectionné dans le states SelectedSponors
    arrayToEdit.push(value)
    setSelectedSponsor(arrayToEdit)
    //récuperation de la liste des pendings du sponsors avant envoie
    const arrayOfpendings = memberMatch.filter(element => element.id === value)[0]
    const arrayToedditpendings = arrayOfpendings.pendings
    arrayToedditpendings.push({"id": userContext.authState.user.id})
    //préparation de l'envoie
    const data = new Object
    data.pendings = arrayToedditpendings
    await userApi.updateUser(data, value).then(response => {
        if(!response.status){
            setSendAsk(true)
        }
    })
  }

  const flatListKeyExtractor = React.useCallback((item) => "" + item.id, []);

  const renderItem = React.useCallback(
      ({ item, index }) => 
          <View style={{width: '100%', height: 90, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', borderColor: 'black', borderStyle: 'solid', borderTopWidth: 0.3}}>
            <View style={{ height: '100%', width: '25%', alignItems: 'center', justifyContent: 'center'}}>
                <Image source={{ uri: item.avatarUrl }} style={{maxWidth: '90%', width: 50, height: 50, borderRadius: 30 }}></Image>
            </View>
            <View style={{width: '50%'}}>
                <Text style={{fontWeight: 'bold'}}>{item.username}</Text>
                <Text style={{fontWeight: '200'}}>est présente sur l'application</Text>
            </View>
            <TouchableOpacity disabled={selectedSponsor.includes(item.id) ? true : false} value={item.id} onPress={() => addSelectedSponsor(item.id, item.username)}>
            {  selectedSponsor.includes(item.id)?
                <Text style={{color: 'white', backgroundColor: '#a2a2a2', width: 80, height: 44,  textAlign: 'center', textAlignVertical: 'center', borderRadius: 4 }}> Envoyé </Text>
                :
                <Text style={{ backgroundColor: '#F9BC0A', width: 80, height: 44,  textAlign: 'center', textAlignVertical: 'center', borderRadius: 4 }}> Demander </Text>
            }
            </TouchableOpacity>
          </View>,
      [selectedSponsor]
  );


  return (
    <View style={{backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
        <FlatList
        ListHeaderComponentStyle={{backgroundColor: 'white'}}
            ListHeaderComponent={(
                <View style={{ width: '100%', height: 90, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Contact Phone</Text>
                </View>
            )}
            ListFooterComponent ={(
                memberMatch.length === 0 ? <Text style={{padding: 45, width:'100%', textAlign: 'center', fontSize:18, justifyContent: 'center'}}>Aucun Résultat 🤔</Text> : null
            )}
            data={memberMatch}
            renderItem={renderItem}
            keyExtractor={flatListKeyExtractor}
            style={{ height: '90%', width: '100%' }}
            stickyHeaderIndices={[0]}
        />
    
        <TouchableOpacity
        style={{ ...sharedStyles.primaryButtonWithColor, marginBottom: 10 }}
        onPress={() => closeModal(SendAsk)}>
        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Poursuivre</Text>
        </TouchableOpacity>
    </View>
  );
}