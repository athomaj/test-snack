import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Modal, TextInput, StatusBar, StyleSheet } from 'react-native';
import { sharedStyles } from '../../utils/styles';
import { useUserContext } from '../../context/UserContext';
import { colors } from '../../utils/colors';
import validateEmail from '../../utils/sharedFunctions';
import PhoneInput from 'react-native-phone-number-input';
import { isIphoneX } from '../../utils/isIphoneX';

export default function UpdateProfil({ navigation }) {
    const validateEmailicon = require('../../assets/icon/validated_color.png');
    const forbidenEmail = require('../../assets/icon/forbiden_color.png');

    const userContext = useUserContext();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalCase, setModalCase] = React.useState({
        name: '',
        attribute: '',
        value: null,
        resolve: false,
    });

    const [isvalidEmail, setValideEmail] = React.useState(true)
    const phoneInput = React.useRef(null);

    function valideInputEmail(text) {
        if (validateEmail(text)) {
            setValideEmail(true)
        }
        else setValideEmail(false)
    }


    return (
        <SafeAreaView style={{ height: '100%', width: '100%', alrignItems: 'center', backgroundColor: 'white' }}>
            <ScrollView style={{ width: '100%', height: '100%' }}>
                <TouchableOpacity onPress={navigation.goBack} style={{ height: 30, width: 40, marginTop: 10, justifyContent: 'center', marginLeft: 20 }}>
                    <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../assets/icon/return_icon.png')}></Image>
                </TouchableOpacity>

                <View style={updateProfilStyles.blockContainer}>
                    <Image source={require('../../assets/icon/iconUser.png')} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 15 }}></Image>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('UpdateProfil4', { position: 'UpdateProfil' }) }}
                    ><Text style={{ ...sharedStyles.shortText }}>Compléter mon profil</Text></TouchableOpacity>
                </View>

                <View style={updateProfilStyles.blockContainer}>
                    <Image source={require('../../assets/icon/iconUser.png')} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 15 }}></Image>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('UpdateProfil2', { position: 'UpdateProfil' }) }}
                    ><Text style={{ ...sharedStyles.shortText }}>Mes cuisines phares</Text></TouchableOpacity>
                </View>

                <View style={updateProfilStyles.blockContainer}>
                    <Image source={require('../../assets/icon/iconUser.png')} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 15 }}></Image>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('UpdateProfil3', { position: 'UpdateProfil' }) }}
                    ><Text style={{ ...sharedStyles.shortText }}>Mon régime alimentaire</Text></TouchableOpacity>
                </View>


                <View style={{ ...sharedStyles.bottomCaesura }}>

                    <View style={{ flexDirection: 'row', paddingVertical: 15, paddingLeft: 15, alignItems: 'center' }}>
                        <Image source={require('../../assets/icon/iconUser.png')} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 15 }}></Image>
                        <Text style={{ ...sharedStyles.shortText }}>Mon compte</Text>
                    </View>

                    <View style={{ width: 320, alignSelf: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => { setModalCase({ name: 'adresse mail', attribute: 'email', resolve: false, value: userContext.authState.user.email }), setModalVisible(true) }}
                            style={{ ...sharedStyles.bottomCaesura, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
                        ><Text style={{ ...sharedStyles.label }}>E-mail</Text>
                            <Image style={{ width: 6, height: 10, resizeMode: 'contain', marginRight: 15 }} source={require('../../assets/icon/iconNext.png')}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { setModalCase({ name: 'mot de passe', attribute: 'password', resolve: false }), setModalVisible(true) }}
                            style={{ ...sharedStyles.bottomCaesura, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
                        ><Text style={{ ...sharedStyles.label }}>Mot de passe</Text>
                            <Image style={{ width: 6, height: 10, resizeMode: 'contain', marginRight: 15 }} source={require('../../assets/icon/iconNext.png')}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { setModalCase({ name: 'numéro de téléphone', attribute: 'numberPhone', resolve: false, value: userContext.authState.user.phone }), setModalVisible(true) }}
                            style={{ ...sharedStyles.bottomCaesura, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
                        ><Text style={{ ...sharedStyles.label }}>Numero de téléphone</Text>
                            <Image style={{ width: 6, height: 10, resizeMode: 'contain', marginRight: 15 }} source={require('../../assets/icon/iconNext.png')}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { navigation.navigate('SignUpStep3', { position: 'UpdateProfil' }) }}
                            style={{ paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 15 }}
                        ><Text style={{ ...sharedStyles.label }}>Modifier mon adresse </Text>
                            <Image style={{ width: 6, height: 10, resizeMode: 'contain', marginRight: 15 }} source={require('../../assets/icon/iconNext.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
            >
                <View style={{ zIndex: 3, width: '100%', height: '100%', backgroundColor: 'white', paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={{  position: 'absolute', top: isIphoneX() ? 60 : 30, left: 20, flexDirection: 'row' }}>
                        <Image source={require('../../assets/icon/return_icon.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                        <Text style={{ ...sharedStyles.shortText, marginLeft: 10 }}>Revenir aux paramètre</Text>
                    </TouchableOpacity>
                    {
                        modalCase.resolve &&
                        <>
                            <Text style={{ ...sharedStyles.shortText }}>{`Votre ${modalCase.name} a été mis à jour !`}</Text>
                            <TouchableOpacity
                                onPress={() => { setModalCase({ name: '', attribute: '', resolve: false, value: '' }), setModalVisible(false) }}

                            ><Text style={{ ...sharedStyles.h3, color: colors.darkColor, marginTop: 15 }}>Revenir au paramètre</Text></TouchableOpacity>
                        </>
                    }

                    {modalCase.attribute === 'password' && modalCase.resolve === false &&
                        <>
                            <Text style={{ ...sharedStyles.h4, width: '80%', textAlign: 'center', marginTop: 15 }}>Vous êtes sur le point de changer votre mot de passe.</Text>
                            <View style={{ height: 44, width: '100%', alignItems: 'center', justifyContent: 'center', marginVertical: 15 }}>
                                <TextInput
                                    textContentType='password'
                                    secureTextEntry={true}
                                    value={modalCase.value}
                                    onChangeText={(text) => setModalCase({ ...modalCase, value: text })}
                                    placeholder='Créer un mot de passe'
                                    placeholderTextColor={colors.darkGreen}
                                    style={{ ...sharedStyles.inputText, marginVertical: 15, }}
                                >
                                </TextInput>
                                {typeof modalCase.value === 'string' && modalCase.value.length > 0 &&
                                    <Image style={{ position: 'absolute', zIndex: 1, width: 15, height: 15, right: 15 }} source={modalCase.value.length > 5 ? validateEmailicon : forbidenEmail}></Image>
                                }
                            </View>
                        </>
                    }

                    {modalCase.attribute === 'email' && modalCase.resolve === false &&
                        <>
                            <Text style={{ ...sharedStyles.h4, width: '80%', textAlign: 'center', marginTop: 15 }}>Vous êtes sur le point de changer votre adresse mail.</Text>
                            <View style={{ height: 44, width: '100%', alignItems: 'center', justifyContent: 'center', marginVertical: 25 }}>
                                <TextInput
                                    autoComplete='off'
                                    autoCapitalize='none'
                                    keyboardType='email-address'
                                    value={modalCase.value} onChangeText={(text) => { setModalCase({ ...modalCase, value: text }), valideInputEmail(text) }}
                                    placeholder='Entrer votre nouveau email'
                                    placeholderTextColor={colors.darkGreen}
                                    style={{ ...sharedStyles.inputText }}
                                >
                                </TextInput>
                                {typeof modalCase.value === 'string' && modalCase.value.length > 0 &&
                                    <Image style={{ position: 'absolute', zIndex: 1, width: 15, height: 15, right: 15 }} source={isvalidEmail ? validateEmailicon : forbidenEmail}></Image>
                                }
                            </View>
                        </>
                    }

                    {
                        modalCase.attribute === 'numberPhone' && modalCase.resolve === false &&
                        <>
                            <StatusBar barStyle="light-content" />
                            <View style={{ ...sharedStyles.inputText, justifyContent: 'center', alignItems: 'flex-start' }}>

                                <PhoneInput
                                    textInputProps={{ placeholder: 'numéro de téléphone', placeholderTextColor: colors.darkGreen, returnKeyType: "done" }}
                                    containerStyle={{ backgroundColor: '#00000000' }}
                                    textContainerStyle={{ backgroundColor: '#00000000' }}
                                    codeTextStyle={{ textAlignVertical: 'center', height: 20 }}
                                    ref={phoneInput}
                                    defaultValue={modalCase.value}
                                    defaultCode="FR"
                                    layout="first"
                                    onChangeText={(text) => {
                                        setModalCase({ ...modalCase, value: text });
                                        phoneInput.current?.isValidNumber(modalCase.value) ? phoneInput.current.blur : null;
                                        // setNumberPhone(text);set
                                    }}
                                />

                                {(modalCase.value + "").length > 0 &&
                                    <Image style={{ position: 'absolute', zIndex: 1, width: 15, height: 15, right: 15, top: 15 }} source={phoneInput.current?.isValidNumber(modalCase.value + "") ? validateEmailicon : forbidenEmail}></Image>
                                }
                            </View>
                        </>
                    }

                    <TouchableOpacity
                        onPress={() => { userContext.updateUserInformation({ [modalCase.attribute]: modalCase.value }), setModalCase({ ...modalCase, resolve: true }) }}
                        style={{ ...sharedStyles.primaryButtonWithColor, position: 'absolute', bottom: isIphoneX() ? 40 : 20 }}>
                        <Text style={{ ...sharedStyles.textUnderPrimaryButton }}>Modifier</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const updateProfilStyles = StyleSheet.create({  
    blockContainer: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center', 
        borderBottomColor: colors.darkGreen,
        borderStyle: 'solid',
        borderBottomWidth: 0.5
    },
})