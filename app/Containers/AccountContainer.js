import React from 'react';
import { Image, Linking, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    const [image, setImage] = React.useState({ url: "https://i.stack.imgur.com/F6zSD.png" })


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
                userContext.updatePicture({ picture: result.uri })
            }
        };
        return (
            <TouchableOpacity onPress={() => pickImage()} style={{ height: 200, width: 200, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../assets/userFakeImage/imagePicker_photo.png')} style={{ position: 'absolute', width: 200, height: 200, borderRadius: 100, zIndex: 1, borderColor: colors.darkGreen, borderWidth: 2 }} />
                {image ?
                    <Image source={{ uri: image }} style={{ position: 'absolute', width: 200, height: 200, borderRadius: 100 }} />
                    :
                    <Image source={imageUrl ? { uri: imageUrl } : require('../assets/userFakeImage/avatar_blue.png')} style={{ position: 'absolute', width: 200, height: 200, borderRadius: 100 }} />
                }
            </TouchableOpacity>
        );
    }

    React.useEffect(() => {
        setAvatarUrl(userContext.authState.user.avatar?.formats.thumbnail?.url ? BASE_URL + userContext.authState.user.avatar?.formats.thumbnail.url : null)
        setUserName(userContext.authState.user.username)
        setNumberPendings(userContext.authState.user.pendings.length > 0 ? userContext.authState.user.pendings.length : null)
    }, [])

    React.useEffect(() => {
        if (!userContext.authState.isConnected) {
            navigation.replace('AuthStack')
        }
    }, [userContext.authState.isConnected])

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', alignItems: 'center', backgroundColor: colors.secondaryBlue }}>
            <ScrollView style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
                <View style={{ backgroundColor: colors.secondaryBlue, paddingTop: 48, width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 25 }}>

                    <ImagePickerAcount image={image?.uri} imageUrl={avatarUrl} setParamImage={(returnImage) => setImage(returnImage)}></ImagePickerAcount>

                    <Text style={{ ...sharedStyles.h2, paddingTop: 13 }}>{userName}</Text>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Profil', { userId: userContext.authState.user.id }) }}
                    ><Text style={{ ...sharedStyles.shortText, textDecorationStyle: "solid", textDecorationLine: "underline", textDecorationColor: colors.darkGreen }}>Afficher le profil</Text></TouchableOpacity>
                </View>
                <View style={accountStyles.blockContainer}>
                    <Image source={require('../assets/icon/iconUser.png')} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 15 }}></Image>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Pendings')}
                    ><Text style={{ ...sharedStyles.shortText }}>Demande de parainnage</Text></TouchableOpacity>
                    {numberPendings &&
                        <View style={{ position: 'absolute', right: 8, backgroundColor: colors.darkGreen, width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>{numberPendings}</Text>
                        </View>
                    }
                </View>

                <TouchableOpacity style={accountStyles.blockContainer}>
                    <Image source={require('../assets/icon/iconUser.png')} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 15 }}></Image>
                    <Text style={{ ...sharedStyles.shortText }}>Mon Matèriel</Text>
                </TouchableOpacity>

                <View style={accountStyles.blockContainer}>
                    <Image source={require('../assets/icon/iconUser.png')} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 15 }}></Image>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('UpdateProfil', { position: 'Account' }) }}
                    ><Text style={{ ...sharedStyles.shortText }}>Modifier mon profil</Text></TouchableOpacity>
                </View>

                <TouchableOpacity onPress={Linking.openSettings} style={accountStyles.blockContainer}>
                    <Image source={require('../assets/icon/iconUser.png')} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 15 }}></Image>
                    <Text style={{ ...sharedStyles.shortText }}>Paramètres</Text>
                </TouchableOpacity>

                <View style={accountStyles.blockContainer}>
                    <Image source={require('../assets/icon/iconUser.png')} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 15 }}></Image>
                    <TouchableOpacity><Text style={{ ...sharedStyles.shortText }}>Noter l’application</Text></TouchableOpacity>
                </View>

                <View style={accountStyles.endBlock}>
                    <TouchableOpacity onPress={userContext.disconnect}>
                        <Text style={{ ...sharedStyles.shortText }}>Me déconnecter</Text>
                    </TouchableOpacity>
                    <Text style={{ ...sharedStyles.label }}>Version 1.0.0</Text>
                </View>

            </ScrollView>


        </SafeAreaView >
    );
}

const accountStyles = StyleSheet.create({
    blockContainer: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center', 
        borderBottomColor: colors.darkGreen,
        borderStyle: 'solid',
        borderBottomWidth: 0.5
    },
    endBlock: {
        height: 64, width: '100%', flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-between', alignItems: 'center'
    }
})