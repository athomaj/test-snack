import React from 'react';
import { SafeAreaView, TextInput, View, TouchableOpacity, Text, ActivityIndicator, Image } from 'react-native';
import { colors } from '../utils/colors';
import { isIphoneX } from '../utils/isIphoneX';
import sharedStyles from '../utils/styles';
import { useFocusEffect } from '@react-navigation/native';
import HeaderChapter from './Utils/HeaderChapter';
import ImagePickerExample from './Utils/picturePicker';
import SevenFamillycheckBox from './Utils/sevenFamilyCheckbox';
import validateEmail from './Utils/RegexValidation';


 //Constante de propriétés pour les composants annexe
 const propsSevenFamily = [
    [['#F91111', 'Bec sucré'], ['#38BD17', 'Veggie fan'], ['#9747FF', 'Vive le gras'], ['#47C8FF', 'Pasta Lover']],
    [['#FB10C7', 'World fusion'], ['#A29B3F', 'Tradition'], ['#FC941A', 'El Buli']]
]
//Importation dim'age de validation
const validateEmailicon = require('../assets/icon/validated_color.png');
const forbidenEmail = require('../assets/icon/forbiden_color.png');

export default SignUpComponent = ({ error,loading, requestSignUp, loginStatus }) => {

    // Voir pour utiliser un context const userContext = useUserContext();
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [image, setImage] = React.useState(null);
    const [mealPref, setMealPref] = React.useState("")
    const [shopPref, setShopPref] = React.useState("")
    const [sevenFamily, setSevenFamily] = React.useState([])
    const [isvalideEmail , setValideEmail] = React.useState(false)

    function sendSignUp(){
        requestSignUp(name, email, pass)
    }

    //Info validation

    // Hooks comportement de page
    const [stepNumber, setStep] = React.useState(0)
    const [disabledButton, setDisabledButton] = React.useState(true)
   
    

    //Distribution de l'état du screen
    function incremmentStep(stepIndex) {
        if (stepIndex === -1) {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
        setStep(stepNumber + stepIndex)
    }

    //condition de dévérouillage du bouton "continué"
    function onChangeText(text, inputIndex) {
        if (stepNumber === 1) {
            (email.length > 0 && pass.length > 5) ? setDisabledButton(false) : setDisabledButton(true)
            if(inputIndex === 0){
                setValideEmail(validateEmail(email))
            }
            inputIndex === 0 ? setEmail(text) : setPass(text)
        } else if (stepNumber === 2) {
            (name.length > 0) ? setDisabledButton(false) : setDisabledButton(true)
            setName(text)
        } else if (stepNumber === 3){
            inputIndex === 3 ? setMealPref(text) : setShopPref(text)

            if(mealPref.length > 0 && shopPref.length > 0 && sevenFamily.length > 0){
                setDisabledButton(false)
            } else setDisabledButton(true);

        } else {
            console.log('on change in else')
        }
    }

    //Function d'ajout et des familles selectionée
    function updateFamily(label) {
        const index2 = sevenFamily.indexOf(label)
        const arrayToEdit = [...sevenFamily]

        if (index2 != -1) {
            arrayToEdit.splice(index2, 1)
            setSevenFamily(arrayToEdit)
        } else {
            arrayToEdit.push(label)
            setSevenFamily(arrayToEdit)
        }

        if(mealPref.length > 0 && shopPref.length > 0 && arrayToEdit.length > 0){
            setDisabledButton(false) 
        }else{
            setDisabledButton(true)
        }

    }
    //Générateur du bouton de famille à selectionner
    function updateStateSelected(name) {
        const index2 = sevenFamily.indexOf(name)
        return index2 != -1 ? true : false
    }

    function generateSevenFamily(array) {
        return <SevenFamillycheckBox key={array[1]} color={array[0]} label={array[1]} selected={updateStateSelected(array[1])} updateFamily={() => updateFamily(array[1])} > </SevenFamillycheckBox>
    }

    //Récupérer l'image mime
    function setParamImage(returnImage){
        setImage(returnImage)
    }
    
    return (
        <SafeAreaView style={{ height: '100%', width: '100%'}}>
            {stepNumber > 0 &&
                <TouchableOpacity style={{ zIndex: 1, position: 'absolute', height: 30, top: 10, left: 20 }} onPress={() => incremmentStep(-1)}>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}> retour </Text>
                </TouchableOpacity>
            }
            {stepNumber === 0 &&
                <View style={{ width: '100%', height: '100%', alignItems: 'center' }} >
                    <Image style={{ width: '50%', height: '20%', resizeMode: 'contain', marginBottom: '5%', marginTop: '5%' }} source={require('../assets/logo_typo.png')}></Image>
                    <View style={{ height: '50%', width: '80%', justifyContent: "flex-start" }}>
                        <Text style={sharedStyles.title.h1}>Hello fou de food!</Text>
                        <Text>Ici vous allez pouvoir partager votre passion de la cuisine avec vos voisins de quartier. Ateliers thématiques, dîners partagés, prêt de matériel, bons plans circuits courts, défi de Chef, vous êtes entre passionés et en confiance.</Text>
                        <Text>Nous avons tout prévu pour que tout se passe bien, nous comptons aussi sur vous pour qu’une atmosphère de bienveillance et de partage règne!</Text>
                    </View>
            

                    <View style={{ width: '100%', position: 'absolute', bottom: 20, alignItems: 'center' }}>

                        <TouchableOpacity onPress={() => incremmentStep(1)} style={{ ...sharedStyles.primaryButton.avalable, margin: '3%' }}>
                            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Je m'inscris</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, fontWeight: 'normal', color: 'black' }}>Déjà membre ? <Text style={{ fontWeight: 'bold' }}>Se connecter</Text></Text>
                        </TouchableOpacity>

                    </View>
                </View>
            }
            {stepNumber === 1 &&
                <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                    <HeaderChapter text={'Créez votre compte'}></HeaderChapter>
                    <View style={{alignItems:'center', justifyContent: 'center', width:'100%'}}>
                        <TextInput autoComplete= 'off' autoCapitalize='none' keyboardType='email-address' value={email} onChangeText={(text) => onChangeText(text, 0)} placeholder='Email' style={{ ...sharedStyles.sharedStyles.borderBasic, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>
                        <Image style={{zIndex: 1,width:15, height: 15, position: 'absolute', right: '15%', top: 17}} source={isvalideEmail ? validateEmailicon : forbidenEmail}></Image>
                    </View>
                    <TextInput textContentType='password' secureTextEntry={true} value={pass} onChangeText={(text) => onChangeText(text, 1)} placeholder='Mot de passe' style={{ ...sharedStyles.sharedStyles.borderBasic, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>

                    <View style={{ position: 'absolute', bottom: isIphoneX() ? 30 : 10, alignItems: 'center', width: '100%' }}>
                        <TouchableOpacity disabled={disabledButton} onPress={() => incremmentStep(1)} style={disabledButton ? { ...sharedStyles.primaryButton.disabled, margin: '3%' } : { ...sharedStyles.primaryButton.avalable, margin: '3%' }}>
                            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Continuer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            {stepNumber === 2 &&
                <View style={{ width: '100%', height: '90%', alignItems: 'center' }}>
                    <HeaderChapter text={'Vous êtes?'}></HeaderChapter>
                    <TextInput value={name} onChangeText={(text) => onChangeText(text, 1)} placeholder='Prénom' style={{ ...sharedStyles.sharedStyles.borderBasic, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>
                    <View style={{ height: '60%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ImagePickerExample setParamImage={setParamImage}></ImagePickerExample>
                    </View>
                    <View style={{ position: 'absolute', bottom: isIphoneX() ? 30 : 10, alignItems: 'center', width: '100%' }}>
                        <TouchableOpacity disabled={disabledButton} onPress={() => incremmentStep(1)} style={disabledButton ? { ...sharedStyles.primaryButton.disabled, margin: '3%' } : { ...sharedStyles.primaryButton.avalable, margin: '3%' }}>
                            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Continuer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            {stepNumber === 3 &&
                <View style={{ width: '100%', height: '90%', display: 'flex', alignItems: 'center' }}>
                    <HeaderChapter text={'Votre Food profil'}></HeaderChapter>
                    <TextInput value={mealPref} onChangeText={(text) => onChangeText(text, 3)} placeholder='Plat préféré' style={{ ...sharedStyles.sharedStyles.borderBasic, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>
                    <TextInput value={shopPref} onChangeText={(text) => onChangeText(text, 4)} placeholder='Commerce de bouche/Restaurant favori' style={{ ...sharedStyles.sharedStyles.borderBasic, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>

                    <View style={{ marginTop: '10%' }}>
                        <Text style={{ marginTop: '5%' }}><Text style={{ fontWeight: 'bold' }}>Jeu des 7 familles</Text>(choisis la/les tiennes)</Text>
                        <View style={{ width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            {propsSevenFamily[0].map((index) => generateSevenFamily(index))}
                        </View>
                        <View style={{ width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            {propsSevenFamily[1].map((index) => generateSevenFamily(index))}
                        </View>
                    </View>

                    <View style={{ position: 'absolute', bottom: isIphoneX() ? 30 : 10, alignItems: 'center', width: '100%' }}>
                    <Text style={{ marginTop: 10, fontSize: 13, color: colors.red }}>{error}</Text>
                        <TouchableOpacity disabled={disabledButton} style={disabledButton ? { ...sharedStyles.primaryButton.disabled, margin: '3%' } : { ...sharedStyles.primaryButton.avalable, margin: '3%' }}>
                            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Continuer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            {stepNumber === 4 &&
                <View style={{ width: '100%', height: '90%', display: 'flex', alignItems: 'center' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Image style={{ resizeMode: 'contain', width: 90, height: 90, borderRadius: 45, margin: 5 }} source={require('../assets/userFakeImage/image1.png')}></Image>
                        <Image style={{ resizeMode: 'contain', width: 90, height: 90, borderRadius: 45, margin: 5 }} source={require('../assets/userFakeImage/image2.png')}></Image>
                        <Image style={{ resizeMode: 'contain', width: 90, height: 90, borderRadius: 45, margin: 5 }} source={require('../assets/userFakeImage/image3.png')}></Image>
                    </View>

                    <View style={{ position: 'absolute', bottom: isIphoneX() ? 30 : 10, alignItems: 'center', width: '100%' }}>
                        <TouchableOpacity disabled={false} style={disabledButton ? { ...sharedStyles.primaryButton.disabled, margin: '3%' } : { ...sharedStyles.primaryButton.avalable, margin: '3%' }}>
                            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Continuer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </SafeAreaView>
    );
}