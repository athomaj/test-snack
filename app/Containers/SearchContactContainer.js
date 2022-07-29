import React from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';

import userApi from '../services/userApi';

import { useUserContext } from '../context/UserContext';

import { sharedStyles } from '../utils/styles';
import { colors } from '../utils/colors';


export default function SearchContactContainer({ navigation, route }) {

  const userContext = useUserContext()
  const [memberMatch, setMemberMatch] = React.useState([])//Tableau des membres en relation avec l'user
  const [selectedSponsor, setSelectedSponsor] = React.useState([]) //Sponsor ayant reçu l'invitation
  const [SendAsk, setSendAsk] = React.useState(false) //Si un 

  React.useEffect(() => {
    fetchMembers()
  }, []);

  async function fetchMembers() {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        //trate un tableau avec liste des téléphone au bon format
        const phoneNumbers = []

        data.map(element => {
          if (element.phoneNumbers) {
            const elementResult = element.phoneNumbers[0].number.split(" ").join("");
            phoneNumbers.push(elementResult.slice(1))
          }
        })

        const usersContactPhone = await userApi.getUsersContactPhone()

        //Récupère seulement les utilisateurs répertoriés
        const phoneNumbersStringify = JSON.stringify(phoneNumbers)
        const memberSponsor = usersContactPhone.filter(element => phoneNumbersStringify.includes(element.numberPhone))
        setMemberMatch(memberSponsor)
        
        //Traite les sponsor ayant déjà eu la demande
        const arrayMemberInPending = []
        memberSponsor.forEach(memberObject => {
          memberObject.pendings.length > 0 ? memberObject.pendings.forEach(member => {
            if (member.id === userContext.authState.user.id) {
              arrayMemberInPending.push(memberObject.id)
            }
          }) : null
        })
        setSelectedSponsor(arrayMemberInPending)
      }
    }
  }

  async function addSelectedSponsor(value, username) {
    const arrayToEdit = [...selectedSponsor]
    //Ajout du sponsors selectionné dans le states SelectedSponors
    arrayToEdit.push(value)
    setSelectedSponsor(arrayToEdit)

    //récuperation de la liste des pendings du sponsors avant envoie
    const arrayOfpendings = memberMatch.filter(element => element.id === value)[0]
    const arrayToedditpendings = arrayOfpendings.pendings
    arrayToedditpendings.push({ "id": userContext.authState.user.id })
    
    //préparation de l'envoie
    const data = new Object
    data.pendings = arrayToedditpendings
    await userApi.updateUser(data, value).then(response => {
      if (!response.status) {
        setSendAsk(true)
      }
    })
  }

  const flatListKeyExtractor = React.useCallback((item) => "" + item.id, []);

  const renderItem = React.useCallback(
    ({ item, index }) =>
      <View style={{ width: '100%', height: 90, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', borderColor: 'black', borderStyle: 'solid', borderTopWidth: 0.3 }}>
        <View style={{ height: '100%', width: '25%', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={{ uri: item.avatarUrl }} style={{ maxWidth: '90%', width: 54, height: 54, borderRadius: 27, backgroundColor: colors.thirdBlue }}></Image>
        </View>
        <View style={{ width: '50%' }}>
          <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
          <Text style={{ fontWeight: '200' }}>est présente sur l'application</Text>
        </View>
        <TouchableOpacity
          style={{ ...searchContactStyles.contactButton, backgroundColor: selectedSponsor.includes(item.id) ? "#a2a2a2" : "#F9BC0A" }}
          disabled={selectedSponsor.includes(item.id) ? true : false} value={item.id}
          onPress={() => addSelectedSponsor(item.id, item.username)}
        >
          {selectedSponsor.includes(item.id) ?
            <Text style={{ color: 'white' }}> Envoyé </Text>
            :
            <Text> Demander </Text>
          }
        </TouchableOpacity>
      </View>,
    [selectedSponsor]
  );

  return (
    <SafeAreaView style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', paddingHorizontal: 15 }}>
      <FlatList
        ListHeaderComponentStyle={{ backgroundColor: 'white' }}
        ListHeaderComponent={(
          <View style={{ width: '100%', height: 90, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Mes Contacts</Text>
          </View>
        )}
        ListFooterComponent={(
          memberMatch.length === 0 ? <Text style={{ padding: 45, width: '100%', textAlign: 'center', fontSize: 18, justifyContent: 'center' }}>Aucun Résultat 🤔</Text> : null
        )}
        data={memberMatch}
        renderItem={renderItem}
        keyExtractor={flatListKeyExtractor}
        style={{ height: '90%', width: '100%' }}
        stickyHeaderIndices={[0]}
      />

      <View style={{ width: '90%' }}>
        <TouchableOpacity
          style={{ ...sharedStyles.primaryButtonWithColor, marginBottom: 10 }}
          onPress={() => navigation.navigate('UpdateProfil1')}>
          <Text style={{ fontWeight: '600', fontSize: 14, color: 'white' }}>Poursuivre</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const searchContactStyles = StyleSheet.create({
  contactButton: {
    height: 40,
    width: '25%',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  }
})