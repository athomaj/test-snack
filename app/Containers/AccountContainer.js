import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useUserContext } from '../context/UserContext';
import { colors } from '../utils/colors';
import { sharedStyles } from '../utils/styles';
import { BASE_URL } from '../config/config';
import * as ImagePicker from 'expo-image-picker';

export default function AccountContainer({ navigation }) {
    const userContext = useUserContext();
    const [avatarUrl, setAvatarUrl] = React.useState(null)
    const [userName, setUserName] = React.useState(null)
    const [numberPendings, setNumberPendings] = React.useState(null)
    const [image, setImage] = React.useState({url: "https://i.stack.imgur.com/F6zSD.png"})

    function ImagePickerAcount({ image, setParamImage, imageUrl }) {

        const pickImage = async () => {
          // No permissions request is necessary for launching the image library
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
      
          if (!result.cancelled) {
            console.log(result);
            setParamImage(result);
          }
        };
        return (
          <TouchableOpacity onPress={() => pickImage()} style={{ height: 200, width: 200, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/userFakeImage/imagePicker_photo.png')} style={{ position: 'absolute', width: 200, height: 200, borderRadius: 100, zIndex: 1, borderColor: colors.primaryYellow, borderWidth: 2}}/>
            {image ?
              <Image source={{ uri: image }} style={{ position: 'absolute', width: 200, height: 200, borderRadius: 100 }} />
              :
              <Image source={ imageUrl ? {uri : imageUrl} : require('../assets/userFakeImage/avatar_blue.png')} style={{ position: 'absolute', width: 200, height: 200, borderRadius: 100 }} />
            }
          </TouchableOpacity>
        );
      }

    React.useEffect(()=>{
        setAvatarUrl(BASE_URL+userContext.authState.user.avatar?.formats.thumbnail.url)
        setUserName(`${userContext.authState.user.firstName} ${userContext.authState.user.lastName}`)
        setNumberPendings(userContext.authState.user.pendings.length > 0 ? userContext.authState.user.pendings.length : null)
    },[])

    React.useEffect(() => {
        if (!userContext.authState.isConnected) {
            navigation.replace('AuthStack')
        }
    }, [userContext.authState.isConnected])

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', alignItems: 'center', backgroundColor: 'white' }}>
        <ScrollView style={{width: '100%', height: '100%'}}>
            <View style={{backgroundColor: colors.secondaryBlue, paddingTop: 48, width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 25}}>
                <ImagePickerAcount image={image?.uri} imageUrl={avatarUrl} setParamImage={(returnImage) => setImage(returnImage)}></ImagePickerAcount>
                <Text style={{...sharedStyles.h2, paddingTop: 13}}>{userName}</Text>
                <TouchableOpacity
                onPress={() => { navigation.navigate('Profil',{ userId: userContext.authState.user.id })}}
                ><Text style={{...sharedStyles.shortText, textDecorationStyle: "solid", textDecorationLine:"underline", textDecorationColor: colors.primaryYellow}}>Afficher le profil</Text></TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 15, paddingVertical: 20, flexDirection: 'row', ...sharedStyles.bottomCaesura}}>
                <Image source={require('../assets/icon/iconUser.png')} style={{width: 24, height: 24, resizeMode: 'contain', marginRight: 15}}></Image>
                <TouchableOpacity
                onPress={() => navigation.navigate('Pendings')}
                ><Text style={{...sharedStyles.shortText}}>Demande de parainnage</Text></TouchableOpacity>
                { numberPendings &&
                <Text style={{position: 'absolute', top: 8, right:8, backgroundColor: colors.primaryYellow, width: 20, height: 20, borderRadius:10, color: 'white', textAlignVertical: 'center', textAlign: 'center'}}>{numberPendings}</Text>
                }
            </View>

            <View style={{paddingHorizontal: 15, paddingVertical: 20, flexDirection: 'row', ...sharedStyles.bottomCaesura}}>
                <Image source={require('../assets/icon/iconUser.png')} style={{width: 24, height: 24, resizeMode: 'contain', marginRight: 15}}></Image>
                <TouchableOpacity><Text style={{...sharedStyles.shortText}}>Mon Matèriel</Text></TouchableOpacity>
            </View>

            <View style={{paddingHorizontal: 15, paddingVertical: 20,flexDirection: 'row', ...sharedStyles.bottomCaesura}}>
                <Image source={require('../assets/icon/iconUser.png')} style={{width: 24, height: 24, resizeMode: 'contain', marginRight: 15}}></Image>
                <TouchableOpacity><Text style={{...sharedStyles.shortText}}>Modifier mon profil</Text></TouchableOpacity>
            </View>

            <View style={{paddingHorizontal: 15, paddingVertical: 20,flexDirection: 'row', ...sharedStyles.bottomCaesura}}>
                <Image source={require('../assets/icon/iconUser.png')} style={{width: 24, height: 24, resizeMode: 'contain', marginRight: 15}}></Image>
                <TouchableOpacity><Text style={{...sharedStyles.shortText}}>Paramètres</Text></TouchableOpacity>
            </View>

            <View style={{paddingHorizontal: 15, paddingVertical: 20, flexDirection: 'row', ...sharedStyles.bottomCaesura}}>
                <Image source={require('../assets/icon/iconUser.png')} style={{width: 24, height: 24, resizeMode: 'contain', marginRight: 15}}></Image>
                <TouchableOpacity><Text style={{...sharedStyles.shortText}}>Noter l’application</Text></TouchableOpacity>
            </View>

            <View style={{height: 64, width: '100%', flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity onPress={userContext.disconnect}>
                    <Text style={{...sharedStyles.shortText}}>Me déconnecter</Text>
                </TouchableOpacity>
                <Text style={{...sharedStyles.label}}>Version 1.0.0</Text>
            </View>
            
        </ScrollView>
        </SafeAreaView>
    );
}

/**
 * ALL STYLE
 * <View style={{ flexDirection: 'row',}}>
                    <Image source={require('../assets/icon/iconUser.png')} style={{width: 24, height: 24, resizeMode: 'contain', marginRight: 15}}></Image>
                    <Text style={{...sharedStyles.shortText, paddingBottom: 15}}>Paramètres</Text>
                </View>
                <View style={{width: 290, alignSelf: 'flex-end'}}>
                    <TouchableOpacity
                    style={{...sharedStyles.bottomCaesura, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}
                    ><Text style={{...sharedStyles.label}}>E-mail</Text>
                    <Image style={{width: 6, height: 10, resizeMode: 'contain'}} source={require('../assets/icon/iconNext.png')}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={{...sharedStyles.bottomCaesura, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}
                    ><Text style={{...sharedStyles.label}}>Numéro de téléphone</Text>
                    <Image style={{width: 6, height: 10, resizeMode: 'contain'}} source={require('../assets/icon/iconNext.png')}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={{...sharedStyles.bottomCaesura, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}
                    ><Text style={{...sharedStyles.label}}>Mot de passe</Text>
                    <Image style={{width: 6, height: 10, resizeMode: 'contain'}} source={require('../assets/icon/iconNext.png')}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={{ paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}
                    ><Text style={{...sharedStyles.label}}>Notifications</Text>
                    <Image style={{width: 6, height: 10, resizeMode: 'contain'}} source={require('../assets/icon/iconNext.png')}></Image>
                    </TouchableOpacity>

                </View>
 */