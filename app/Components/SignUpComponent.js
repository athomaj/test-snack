import React from 'react';
import { SafeAreaView, TextInput, View, TouchableOpacity, Text, ActivityIndicator, Image } from 'react-native';
import { colors } from '../utils/colors';
import { isIphoneX } from '../utils/isIphoneX';
import { sharedStyles, primaryButton, title } from '../utils/styles';
import { useFocusEffect } from '@react-navigation/native';
import HeaderChapter from './Utils/HeaderChapter';
import ImagePickerExample from './Utils/picturePicker';
import SevenFamillycheckBox from './Utils/sevenFamilyCheckbox';

export default function SignUpComponent({ loading, requestSignUp, loginStatus }) {

    // Voir pour utiliser un context const userContext = useUserContext();
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [image, setAvatar] = React.useState("")
    const [platpref, setPlatpref]= React.useState("")
    const [commercepref, setCommercePref]= React.useState("")
    const [sevenFamily, setSevenFamily]= React.useState([])

    const [stepNumber, setStep] = React.useState(0)
    const [disabledButton, setDisabledButton] = React.useState(true)
    const [disabledButtonTwo, setDisabledButtonTwo] = React.useState(true)
    const [ctaStyle, setValidateStepOne] = React.useState(primaryButton.disabled)
    const [ctaStyleTwo, setValidateStepTwo] = React.useState(primaryButton.disabled)

    const propsSevenFamily =[
        [['#F91111','Bec sucré'],['#38BD17','Veggie fan'],['#9747FF','Vive le gras'],['#47C8FF','Pasta Lover']],
        [['#FB10C7','World fusion'],['#A29B3F','Tradition'],['#FC941A','El Buli']]
    ]
    

    function incremmentStep(stepIndex){
        setStep(stepNumber+stepIndex)
    }
    
    function validationStep(){
        if(stepNumber === 1 && pass.length >= 6 && email !== null)
        {
            setDisabledButton(false)
            setValidateStepOne(primaryButton.avalable)
        }
        else
        {
            console.log('innaccessible')
            setDisabledButton(true)
            setValidateStepOne(primaryButton.disabled)
        }
    }

    function validationstpeTwo(){
        if(stepNumber === 2 && name !== null){
            setDisabledButtonTwo(false)
            setValidateStepTwo(primaryButton.avalable)
        }
        else{
            setDisabledButtonTwo(true)
            setValidateStepTwo(primaryButton.disabled)
        }
    }

    function updateFamily(label){
        const index2 = sevenFamily.indexOf(label)
        const arrayToEdit = [...sevenFamily]

        if (index2 != -1) {
            arrayToEdit.splice(index2, 1)
            setSevenFamily(arrayToEdit)
        } else {
            arrayToEdit.push(label)
            setSevenFamily(arrayToEdit)
        }

    }

    function génératedSevenFamily(array)
    {
        return <SevenFamillycheckBox key={array[1]} color={array[0]} label={array[1]} selected={modifyOpacity(array[1])} updateFamily={() => updateFamily(array[1])} > </SevenFamillycheckBox>
    }

    function modifyOpacity(name)
    {
        const index2 = sevenFamily.indexOf(name)
        return index2 != -1 ? true :  false 
    }
    
    console.log(sevenFamily);
    console.log(sevenFamily.includes('bec sucré'));
        return (
            <SafeAreaView style={{ height: '100%', width: '100%', display: 'flex'}}>
            {stepNumber > 0 &&
            <TouchableOpacity onPress={() => incremmentStep(-1)}>
                <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold',marginLeft: '5%', marginTop: '5%', marginBottom: '5%'}}> retour </Text>
            </TouchableOpacity>
            }
            {stepNumber === 0 &&
            <View style={{ width: '100%', height: '90%', display: 'flex', alignItems: 'center'}} >
                <Image style={{ width: '50%', height: '20%', resizeMode: 'contain', marginBottom: '5%', marginTop: '5%'}} source={require('../assets/logo_typo.png')}></Image>
                <View style={{ height: '50%', width: '80%', display: 'flex', justifyContent:"flex-start"}}>
                    <Text style={title.h1}>Hello fou de food!</Text>
                    <Text>Ici vous allez pouvoir partager votre passion de la cuisine avec vos voisins de quartier. Ateliers thématiques, dîners partagés, prêt de matériel, bons plans circuits courts, défi de Chef, vous êtes entre passionés et en confiance.</Text>
                    <Text>Nous avons tout prévu pour que tout se passe bien, nous comptons aussi sur vous pour qu’une atmosphère de bienveillance et de partage règne!</Text>
                </View>

                <View style={{ width: '100%', position: 'absolute', bottom: 20, alignItems: 'center' }}>
                
                    <TouchableOpacity onPress={() => incremmentStep(1)} style={{ ...primaryButton.avalable, margin: '3%'}}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Je m'inscris</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, fontWeight: 'normal', color: 'black' }}>Déjà membre ? <Text style={{fontWeight: 'bold'}}>Se connecter</Text></Text>
                    </TouchableOpacity>

                </View>
            </View>
            }
            {stepNumber === 1 &&
            <View style={{ width: '100%', height: '90%', display: 'flex', alignItems: 'center'}}>
                <HeaderChapter text={'Créez votre compte'}></HeaderChapter>
                <TextInput  value={email} onChangeText={(text) => setEmail(text)} onEndEditing={validationStep} placeholder='Email' style={{ ...sharedStyles.borderBasic, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>
                <TextInput  value={pass} onChangeText={(text) => setPass(text)} onEndEditing={validationStep} placeholder='Mot de passe' style={{ ...sharedStyles.borderBasic, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>

                <View style={{ position: 'absolute', bottom: isIphoneX() ? 30 : 10, alignItems: 'center', width: '100%' }}>
                    <TouchableOpacity disabled={disabledButton}  onPress={() => incremmentStep(1)}  style={{ ...ctaStyle, margin: '3%'}}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Continuer</Text>
                    </TouchableOpacity>
                </View>
            </View>
            }
            {stepNumber === 2 &&
            <View style={{ width: '100%', height: '90%', display: 'flex', alignItems: 'center'}}>
                <HeaderChapter text={'Vous êtes?'}></HeaderChapter>
                <TextInput value={name} onChangeText={(text) => setName(text)} onEndEditing={validationstpeTwo} placeholder='Prénom' style={{ ...sharedStyles.borderBasic, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>
                <View style={{height:'60%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <ImagePickerExample></ImagePickerExample>
                </View>
                <View style={{ position: 'absolute', bottom: isIphoneX() ? 30 : 10, alignItems: 'center', width: '100%' }}>
                <TouchableOpacity disabled={disabledButtonTwo}  onPress={() => incremmentStep(1)}  style={{ ...ctaStyleTwo, margin: '3%'}}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Continuer</Text>
                    </TouchableOpacity>
                </View>
            </View>
            }
            {stepNumber === 3 &&
            <View style={{ width: '100%', height: '90%', display: 'flex', alignItems: 'center'}}>
                <HeaderChapter text={'Votre Food profil'}></HeaderChapter>
                <TextInput value={platpref} onChangeText={(text) => setPlatpref(text)} onEndEditing={validationstpeTwo} placeholder='Plat préféré' style={{ ...sharedStyles.borderBasic, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>
                <TextInput value={commercepref} onChangeText={(text) => setCommercePref(text)} onEndEditing={validationstpeTwo} placeholder='Commerce de bouche/Restaurant favori' style={{ ...sharedStyles.borderBasic, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>

                <View style={{ marginTop: '10%' }}>
                    <Text style={{marginTop: '5%'}}><Text style={{fontWeight:'bold'}}>Jeu des 7 familles</Text>(choisis la/les tiennes)</Text>
                    <View style={{width: '90%', display: 'flex', flexDirection:'row', justifyContent:'center'}}>
                        {propsSevenFamily[0].map((index) => génératedSevenFamily(index))}
                    </View>
                    <View style={{width: '90%', display: 'flex', flexDirection:'row', justifyContent:'center'}}>
                        {propsSevenFamily[1].map((index) => génératedSevenFamily(index))}
                    </View>
                </View>

                <View style={{ position: 'absolute', bottom: isIphoneX() ? 30 : 10, alignItems: 'center', width: '100%' }}>
                <TouchableOpacity disabled= {false}  onPress={() => incremmentStep(1)}  style={{ ...ctaStyleTwo, margin: '3%'}}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Continuer</Text>
                </TouchableOpacity>
                </View>
            </View>
            }
            {stepNumber === 4 &&
            <View style={{ width: '100%', height: '90%', display: 'flex', alignItems: 'center'}}>
                <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                    <Image style={{resizeMode:'contain', width:90, height:90, borderRadius: 45, margin: 5}}source={require('../assets/userFakeImage/image1.png')}></Image>
                    <Image style={{resizeMode:'contain', width:90, height:90, borderRadius: 45, margin: 5}}source={require('../assets/userFakeImage/image2.png')}></Image>
                    <Image style={{resizeMode:'contain', width:90, height:90, borderRadius: 45, margin: 5}}source={require('../assets/userFakeImage/image3.png')}></Image>
                </View>

                <View style={{ position: 'absolute', bottom: isIphoneX() ? 30 : 10, alignItems: 'center', width: '100%' }}>
                <TouchableOpacity disabled= {false}  onPress={() => incremmentStep(1)}  style={{ ...ctaStyleTwo, margin: '3%'}}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Continuer</Text>
                </TouchableOpacity>
                </View>
            </View>
            }
        </SafeAreaView>
        );
}