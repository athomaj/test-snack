import React from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';

import userApi from '../services/userApi';

import { useUserContext } from '../context/UserContext';

import { sharedStyles } from '../utils/styles';
import { colors } from '../utils/colors';
import notificationApi from '../services/notificationApi';

export default function SearchContactContainer({ navigation, route }) {

  const userContext = useUserContext()

  const [memberMatch, setMemberMatch] = React.useState([])
  const [selectedSponsor, setSelectedSponsor] = React.useState([])

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
        const phoneNumbers = []

        data.map(element => {
          if (element.phoneNumbers) {
            const elementResult = element.phoneNumbers[0].number.split(" ").join("");
            phoneNumbers.push(elementResult)
          }
        })

        const usersContactPhone = await userApi.getUsersContactPhone()

        const phoneNumbersStringify = JSON.stringify(phoneNumbers)
        const memberSponsor = usersContactPhone.filter(element => phoneNumbersStringify.includes(element.phone) && element.id !== userContext.authState.user.id)
        setMemberMatch(memberSponsor)

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
    try {
      const arrayToEdit = [...selectedSponsor]
      
      arrayToEdit.push(value)
      setSelectedSponsor(arrayToEdit)
  
      const arrayOfpendings = memberMatch.filter(element => element.id === value)[0]
      const arrayToedditpendings = arrayOfpendings.pendings
      arrayToedditpendings.push({ "id": userContext.authState.user.id })
  
      const data = new Object
      data.pendings = arrayToedditpendings
        
      await userApi.updateUser(data, value)
      
      sendNotification(value)
    } catch (error) {
      console.log(error, "ERR SEND SPONSOR ====")
    }

  }

  async function sendNotification(id) {
    try {
      const res = await notificationApi.createNotification({
        data: {
            title: userContext.authState.user.username,
            description: 'Vous a demandé votre parrainage.',
            type: 'sponsor',
            user: {id: id},
            userRequest: {id: userContext.authState.user.id}
        }
      })
      console.log(res, "NOTIF RES ====")
    } catch (error) {
      console.log(error, "ERR SEND NOTIF ====")
    }
  }

  function onClickNext() {
    if (userContext.authState.user.kitchen.length > 0) {
      navigation.replace('MainStack')
    } else {
      navigation.navigate('UpdateProfil1')
    }
  }

  const flatListKeyExtractor = React.useCallback((item) => "" + item.id, []);

  const renderItem = React.useCallback(
    ({ item, index }) =>
      <View style={{ width: '100%', height: 90, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', borderColor: 'black', borderStyle: 'solid', borderTopWidth: 0.3 }}>
        <View style={{ height: '100%', width: '20%', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={item.avatarUrl ? { uri: item.avatarUrl } : require('../assets/userFakeImage/avatar_blue.png')} style={{ maxWidth: '90%', width: 54, height: 54, borderRadius: 27, backgroundColor: colors.thirdBlue }}></Image>
        </View>
        <View style={{ width: '50%' }}>
          <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
          <Text style={{ fontWeight: '200' }}>est présente sur l'application</Text>
        </View>
        <View style={{ width: '30%', alignItems: 'flex-end' }}>
          <TouchableOpacity
            style={{ ...searchContactStyles.contactButton, backgroundColor: selectedSponsor.includes(item.id) ? `${colors.orange1}55` : colors.orange1  }}
            disabled={selectedSponsor.includes(item.id) ? true : false} value={item.id}
            onPress={() => addSelectedSponsor(item.id, item.username)}
          >
            {selectedSponsor.includes(item.id) ?
              <Text style={{ color: 'white' }}> Envoyé </Text>
              :
              <Text style={{...sharedStyles.textUnderPrimaryButton}}> Demander </Text>
            }
          </TouchableOpacity>
        </View>
      </View>,
    [selectedSponsor]
  );

  return (
    <SafeAreaView style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', paddingHorizontal: 15, backgroundColor: colors.backgroundColor }}>
      <FlatList
        ListHeaderComponentStyle={{ backgroundColor: colors.backgroundColor }}
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
          onPress={onClickNext}>
          <Text style={{...sharedStyles.textUnderPrimaryButton }}>Poursuivre</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const searchContactStyles = StyleSheet.create({
  contactButton: {
    height: 40,
    width: '90%',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  }
})