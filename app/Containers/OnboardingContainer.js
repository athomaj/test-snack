import React from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, Text, FlatList, Dimensions,TouchableHighlight } from 'react-native';
import LoginComponent from '../Components/LoginComponent';
import SignUpComponent from '../Components/SignUpComponent';
import { useUserContext } from '../context/UserContext';
import { sharedStyles } from '../utils/styles';

const DATA = [
    {
        id : 0,
        image :'https://www.marcoguzzo.net/img/placeholder.png',
        titre : 'Bienvenue fou de Food',
        description :'Ici vous allez pouvoir partager votre passion de la cuisine avec vos voisins'
    },
    {
        id : 1,
        image :'https://www.marcoguzzo.net/img/placeholder.png',
        titre :'Plein d’activités',
        description :'Ateliers thématiques, dîners partagés, prêt de matériel...'
    },
    {
        id : 2,
        image :'https://www.marcoguzzo.net/img/placeholder.png',
        titre :'Gens de confiance',
        description :'vous êtes entre passionés et en confiance.'
    }
]

export default function OnboardingContainer({ navigation, route }) {


    const [ indexItemView, setIndexItemView] = React.useState(0)
    
    React.useEffect(() => {
        console.log(DATA)
        console.log(DATA[0].image)
    }, []);

    // function selectedDot(id){
    //     console.log('CONSOLE DE ID =====>',id)
    // }
    const selectedDot =
        (scrollPosition) =>{
            const screenWith = Dimensions.get('window').width
            const numberOfItems = DATA.length
            const indexofitem = Math.abs((-(numberOfItems-1)+((screenWith*numberOfItems)-(scrollPosition+screenWith))/(screenWith)))
            setIndexItemView(indexofitem)
        }

    const dotMap = DATA.map(
        (element) => {
            console.log(indexItemView)
            console.log(element.id)
                if(element.id===indexItemView){
                console.log('IN')
                    return <View id={element.id} style={{height: 10, marginHorizontal: 4, width: 10, borderRadius: 5, backgroundColor: '#005DB2E5' }}></View>
                }
                else{
                    return <View id={element.id} style={{height: 8, marginHorizontal: 4, width: 8, borderRadius: 4, backgroundColor: '#005DB266' }}></View>
                }
            }
    )
    
    const renderItem = React.useCallback(
        ({ item, index }) => {
            return(
            <View 
            style={{height: '100%', width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center'}}
            >
                <Image 
                style={{width: 161, height: 129, marginBottom: 83}}
                source={require('../assets/onboarding/pictureOnboarding.png')}
                />
                <Text style={{ width: '80%', fontSize: 24, fontWeight: "600", textAlign: 'center', color:'#0A4072'}}>{item.titre}</Text>
                <Text style={{ width: '80%', textAlign: 'center', color:'#0A4072'}}>{item.description}</Text>
            
            </View>)},
        []
    );

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: '#E6EFF7' }}>
            <View style={{ height: '100%', width: '100%' }}>
                <Text style={{...sharedStyles.titleH1, position: 'absolute', top: 60, width: '100%', textAlign: 'center'}}>FoodFood</Text>
               
                <FlatList
                    data={DATA}
                    horizontal
                    renderItem={renderItem}
                    // contentContainerStyle={{width: '100%', height: '100%'}}
                    style={{height: '100%', width: '100%'}}
                    pagingEnabled
                    //keyExtractor={flatListKeyExtractor}
                    horizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    onMomentumScrollEnd={(event) => selectedDot(event.nativeEvent.contentOffset.x)}
                
                />

                <View style={{ width: '100%', position: 'absolute', bottom: 10, alignItems: 'center' }}>
                    <View style={{ height: 10, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                    {dotMap}
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Login', { isLogin: false })} style={{ ...sharedStyles.primaryButtonWithColor, marginBottom: 10 }}>
                        <Text style={{ fontSize: 14, color: 'black', fontWeight: '600' }}>Démarrer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login', { isLogin: true })} style={{...sharedStyles.secondaryButton, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: 'black' }}>Déjà membre ?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}


