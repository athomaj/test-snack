import React from 'react';
import { SafeAreaView, TextInput, View, TouchableOpacity, Text, ActivityIndicator, Image, Switch } from 'react-native';
import { colors } from '../utils/colors';
import SevenFamillycheckBox from './Utils/sevenFamilyCheckbox';
import ImagePickerExample from './Utils/picturePicker';
import validateEmail from './Utils/RegexValidation';
import HeaderChapter from './Utils/HeaderChapter';
import { sharedStyles } from '../utils/styles';
import { sevenFamilies, sevenFamiliesSecond } from '../utils/const';


 //Constante de propriétés pour les composants annexe
const propsSevenFamily = [
    [['#F91111', 'Bec sucré'], ['#38BD17', 'Veggie fan'], ['#9747FF', 'Vive le gras'], ['#47C8FF', 'Pasta Lover']],
    [['#FB10C7', 'World fusion'], ['#A29B3F', 'Tradition'], ['#FC941A', 'El Buli']]
]
//Importation dim'age de validation
const validateEmailicon = require('../assets/icon/validated_color.png');
const forbidenEmail = require('../assets/icon/forbiden_color.png');

export default function SignUpComponent({ loading, error, requestSignUp, loginStatus, userContext, searchContact }) {

    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [image, setImage] = React.useState(null);
    const [mealPref, setMealPref] = React.useState("")
    const [shopPref, setShopPref] = React.useState("")
    const [sevenFamily, setSevenFamily] = React.useState([])
    const [isvalidEmail, setValideEmail] = React.useState(false)

    // Hooks comportement de page
    const [stepNumber, setStep] = React.useState(0)
    const [disabledButton, setDisabledButton] = React.useState(true)

    React.useEffect(() => {
        if (userContext.authState.isConnected) {
            setStep(4)
        }
    }, [userContext.authState.isLoading, userContext.authState.isConnected])

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
            inputIndex === 0 ? setEmail(text) : setPass(text)
            if (inputIndex === 0) {
                const validEmail = validateEmail(text)
                if (validEmail && pass.length > 5) {
                    setDisabledButton(false)
                } else {
                    setDisabledButton(true)
                }
                setValideEmail(validEmail)
                return
            }
            if (text.length > 5 && isvalidEmail) {
                setDisabledButton(false)
            } else {
                setDisabledButton(true)
            }
        } else if (stepNumber === 2) {
            (name.length > 0) ? setDisabledButton(false) : setDisabledButton(true)
            setName(text)
        } else if (stepNumber === 3) {
            inputIndex === 3 ? setMealPref(text) : setShopPref(text)

            if (mealPref.length > 0 && shopPref.length > 0 && sevenFamily.length > 0) {
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

        if (mealPref.length > 0 && shopPref.length > 0 && arrayToEdit.length > 0) {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    }

    //Générateur du bouton de famille à selectionner
    function updateStateSelected(name) {
        const index2 = sevenFamily.indexOf(name)
        return index2 != -1 ? true : false
    }

    function generateSevenFamily(item) {
        return <SevenFamillycheckBox key={item.id} color={item.color} label={item.text} selected={updateStateSelected(item)} updateFamily={() => updateFamily(item)} > </SevenFamillycheckBox>
    }

    function onPressContinue() {
        if (stepNumber === 3) {
            const data = {
                user: {
                    username: name,
                    email: email,
                    password: pass,
                    favoriteDish: mealPref,
                    favoritePlace: shopPref,
                    food_families: sevenFamilies,
                    avatarUrl: ""
                },
                picture: image?.uri
            }
            // console.log(data)
            // return
            requestSignUp(data)
        } else if (stepNumber === 4) {
            console.log("Last Step")
        } else {
            incremmentStep(1)
        }
    }

    return (
        <SafeAreaView style={{ height: '100%', width: '100%' }}>
            {stepNumber > 0 && stepNumber < 4 &&
                <>
                    <TouchableOpacity style={{ zIndex: 1, position: 'absolute', height: 30, top: 10, left: 20 }} onPress={() => incremmentStep(-1)}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}> retour </Text>
                    </TouchableOpacity>
                    <View style={{ zIndex: 1, position: 'absolute', bottom: 10, alignItems: 'center', width: '100%' }}>
                        <Text style={{ marginTop: 10, fontSize: 13, color: colors.red }}>{error}</Text>
                        <TouchableOpacity onPress={onPressContinue} disabled={disabledButton} style={{ ...sharedStyles.primaryButtonWithoutColor, backgroundColor: disabledButton ? colors.primaryYellowDisable : colors.primaryYellow }}>
                            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Continuer</Text>
                            <ActivityIndicator style={{ position: 'absolute', right: 15 }} animating={loading} color={'black'}></ActivityIndicator>
                        </TouchableOpacity>
                    </View>
                </>
            }
            {stepNumber === 0 &&
                <View style={{ width: '100%', height: '100%', alignItems: 'center' }} >
                    <Image style={{ height: '20%', width: '50%', resizeMode: 'contain', marginBottom: '5%', marginTop: '5%' }} source={require('../assets/logo_typo.png')}></Image>
                    <View style={{ height: '50%', width: '80%', justifyContent: "flex-start" }}>
                        <Text style={{ ...sharedStyles.titleH1, marginBottom: 20 }}>Hello fou de food!</Text>
                        <Text>Ici vous allez pouvoir partager votre passion de la cuisine avec vos voisins de quartier. Ateliers thématiques, dîners partagés, prêt de matériel, bons plans circuits courts, défi de Chef, vous êtes entre passionés et en confiance.{'\n'}{'\n'}Nous avons tout prévu pour que tout se passe bien, nous comptons aussi sur vous pour qu’une atmosphère de bienveillance et de partage règne!</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Switch
                            trackColor={{ false: "#767577", true: colors.primaryYellow }}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => setDisabledButton(!value)}
                            value={!disabledButton}
                            style={{ marginRight: 10 }}
                        />
                        <Text>J’accepte
                            <Text style={{ fontWeight: 'bold' }}> le règlement du site </Text>
                            {'\n'}et la
                            <Text style={{ fontWeight: 'bold' }}> politique de confidentialité</Text>
                        </Text>
                    </View>

                    <View style={{ width: '100%', position: 'absolute', bottom: 10, alignItems: 'center' }}>
                        <TouchableOpacity disabled={disabledButton} onPress={() => incremmentStep(1)} style={{ ...sharedStyles.primaryButtonWithoutColor, backgroundColor: disabledButton ? colors.primaryYellowDisable : colors.primaryYellow, marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Je m'inscris</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={loginStatus} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, fontWeight: 'normal', color: 'black' }}>Déjà membre ? <Text style={{ fontWeight: 'bold' }}>Se connecter</Text></Text>
                        </TouchableOpacity>

                    </View>
                </View>
            }
            {stepNumber === 1 &&
                <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                    <HeaderChapter text={'Créez votre compte'}></HeaderChapter>
                    <View style={{ height: 50, width: '80%', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                        <TextInput autoComplete='off' autoCapitalize='none' keyboardType='email-address' value={email} onChangeText={(text) => onChangeText(text, 0)} placeholder='Email' style={{ ...sharedStyles.borderBasic, height: 50, width: '100%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15 }}></TextInput>
                        {email.length > 0 &&
                            <Image style={{ position: 'absolute', zIndex: 1, width: 15, height: 15, right: 15 }} source={isvalidEmail ? validateEmailicon : forbidenEmail}></Image>
                        }
                    </View>
                    <TextInput textContentType='password' secureTextEntry={true} value={pass} onChangeText={(text) => onChangeText(text, 1)} placeholder='Mot de passe' style={{ ...sharedStyles.borderBasic, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>
                </View>
            }
            {stepNumber === 2 &&
                <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                    <HeaderChapter text={'Vous êtes?'}></HeaderChapter>
                    <TextInput value={name} onChangeText={(text) => onChangeText(text, 1)} placeholder='Prénom' style={{ ...sharedStyles.borderBasic, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>
                    <View style={{ height: '60%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ImagePickerExample image={image?.uri} setParamImage={(returnImage) => setImage(returnImage)}></ImagePickerExample>
                    </View>
                </View>
            }
            {stepNumber === 3 &&
                <View style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                    <HeaderChapter text={'Votre Food profil'}></HeaderChapter>
                    <TextInput value={mealPref} onChangeText={(text) => onChangeText(text, 3)} placeholder='Plat préféré' style={{ ...sharedStyles.borderBasic, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>
                    <TextInput value={shopPref} onChangeText={(text) => onChangeText(text, 4)} placeholder='Commerce de bouche/Restaurant favori' style={{ ...sharedStyles.borderBasic, height: 50, width: '80%', borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, marginBottom: 20 }}></TextInput>

                    <View style={{ marginTop: '10%' }}>
                        <Text style={{ marginTop: '5%' }}><Text style={{ fontWeight: 'bold' }}>Jeu des 7 familles</Text>(choisis la/les tiennes)</Text>
                        <View style={{ width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            {sevenFamilies.map((index) => generateSevenFamily(index))}
                        </View>
                        <View style={{ width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            {sevenFamiliesSecond.map((index) => generateSevenFamily(index))}
                        </View>
                    </View>
                </View>
            }
            {stepNumber === 4 &&
                <View style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                    <View style={{ height: '30%', width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Image style={{ resizeMode: 'contain', width: 100, height: 100, borderRadius: 50 }} source={require('../assets/userFakeImage/avatar_blue.png')}></Image>
                        <Image style={{ resizeMode: 'contain', width: 100, height: 100, borderRadius: 50 }} source={require('../assets/userFakeImage/avatar_brown.png')}></Image>
                        <Image style={{ resizeMode: 'contain', width: 100, height: 100, borderRadius: 50 }} source={require('../assets/userFakeImage/avatar_purple.png')}></Image>
                    </View>
                    <View style={{ height: '40%', width: '90%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{width: '90%'}}>
                            <Text style={{ fontSize: 27, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Trouvez vos parrains</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'normal', textAlign: 'center' }}>Food Food est accessible sur recommandation. Pour devenir membre, vous devez obtenir 3 parrainages. Pour vous aider à trouver des parrains, nous croisons vos contacts avec la liste des membres. C’est tout !</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>Voir notre politique de confidentialité.</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', position: 'absolute', bottom: 10, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => searchContact(true)} style={{ ...sharedStyles.primaryButtonWithColor, marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Chercher dans vos contacts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => searchContact(false)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'black' }}>Continuer sans parrain</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </SafeAreaView>
    );
}