import React from "react";
import { FlatList, Image, InteractionManager, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import PublishFooterNav from "../../Components/Utils/PublishFooterNav";

import { usePublishContext } from "../../context/PublishContext";

import { kitchenTypeData } from "../../fakeData/kitchenType";
import { dietData } from "../../fakeData/diet";
import { levelData } from "../../fakeData/level";

import { postCreateStyles, sharedStyles } from "../../utils/styles";
import { colors } from "../../utils/colors";
import dietApi from "../../services/dietApi";
import { BASE_URL } from "../../config/config";
import kitchenApi from "../../services/kitchenApi";
import SignupFooterNav from "../../Components/Utils/SignupFooterNav";

export default function PublishPost3({ navigation }) {

    const publishContext = usePublishContext()

    const [buttonDisable, setButtonDisable] = React.useState(false)
    const [dateValue, setDateValue] = React.useState(null)
    const [show, setShow] = React.useState(false)
    const [date, setDate] = React.useState(new Date())
    const [seats, setSeats] = React.useState(0)
    const [kitchen, setKitchen] = React.useState([])
    const [diet, setDiet] = React.useState([])
    const [levelSelected, setLevelSelected] = React.useState(1)

    async function callDiet(){
        const response = await dietApi.getAllDiets()
        if (response) {
            const diets =  response.data.map((diet) => { return {'id': diet.id, 'title': diet.attributes.name, 'image': BASE_URL+diet.attributes.image.data.attributes.url }})
            setDiet(diets)
        } else {
            setError(true)
        }
    }

    async function callKitchen(){
        const response = await kitchenApi.getAllKitchen()
        if(response){
            const kitchens = response.data.map((item)=>{ return {'id': item.id, 'title': item.attributes.name, 'status': false}})
            setKitchen(kitchens)
        } else {
        setError(true)
        }
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDateValue(1)
        setShow(false);
        setDate(currentDate);
    };

    const showDatePicker = () => {
        setShow(true);
    };

    React.useEffect(() => {
        callKitchen()
        callDiet()
    }, [])



    function kitchenTypeChange(index) {
        const data = [...kitchen]
        data[index].status = !data[index].status
        setKitchen(data)
    }

    function dietChange(index) {
        const data = [...diet]
        data[index].status = !data[index].status
        setDiet(data)
    }

    const renderKitchenType = ({ item, index }) => (
        <TouchableOpacity style={{...styles.renderKitchenType, backgroundColor : item.status  ?  colors.blue1 : 'white'}} onPress={() => kitchenTypeChange(index)}>
            <Text style={styles.textKitchenType}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderDiet = ({ item, index }) => (
        <TouchableOpacity onPress={() => dietChange(index)}>
            {item.status === true ?
                <View style={styles.viewDietTrue}>
                    <Image style={styles.imageDiet} source={{uri : item.image}} />
                    <Text style={styles.textDietTrue}>{item.title}</Text>
                </View>
                :
                <View style={styles.viewDiet}>
                    <Image style={styles.imageDiet} source={{uri : item.image}} />
                    <Text style={styles.textDiet}>{item.title}</Text>
                </View>
            }
        </TouchableOpacity>
    );

    const renderLevel = ({ item, index }) => (
        <TouchableOpacity style={{...styles.renderKitchenType, backgroundColor: item.id === levelSelected ? colors.blue1 : 'white'}} onPress={() => setLevelSelected(item.id)}>
            <Text style={styles.textKitchenType}>{item.title}</Text>
        </TouchableOpacity>
    );

    async function onPressContinue() {
        await publishContext.updatePublish3(date, seats, kitchen, diet, levelSelected)

        navigation.navigate('PublishPost4')
    }

    return (
        <SafeAreaView style={{ backgroundColor: colors.backgroundColor }}>
            <View style={{ height: '100%', width: '100%' }}>
                <ScrollView style={styles.container} contentContainerStyle={{ paddingHorizontal: 10 }}>
                    <View style={{ marginTop: Platform.OS === 'ios' ? 80 : 100 }}>
                        <Text style={{...sharedStyles.bigTitle, marginBottom: 30}}>Détail de l’atelier</Text>
                        <Text style={styles.title}>Quelle date vous interesse ?</Text>
                        {Platform.OS === 'ios' ?
                            <View style={{ alignItems: 'flex-start', width: '100%', paddingTop: 5 }}>
                                <DateTimePicker
                                    display="compact"
                                    mode="datetime"
                                    style={{ width: 238 }}
                                    value={date}
                                    onChange={onChange}
                                />
                            </View>
                            :
                            <View style={styles.containerDate}>
                                {dateValue === null ?
                                    <Text style={styles.chooseTextDate}>Choisir une date</Text>
                                    :
                                    <Text style={styles.chooseTextDate}>{moment(date).format('D/MM/YYYY')}</Text>
                                }
                                <TouchableOpacity style={styles.containerSelectDate} onPress={showDatePicker}>
                                    <Image style={styles.selectDate} source={require('../../assets/icon/select.png')} />
                                </TouchableOpacity>
                                {show &&
                                    <DateTimePicker
                                        value={date}
                                        mode={'date'}
                                        is24Hour={true}
                                        onChange={onChange}
                                    />
                                }
                            </View>
                        }
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.title}>Nombre d'invité ?</Text>
                        <TextInput style={styles.guestInput} placeholder={'Choisir un nombre de place'} placeholderTextColor={colors.darkGreen} value={seats} onChangeText={(e) => setSeats(parseInt(e))} keyboardType={"number-pad"} />
                    </View>
                    <View style={styles.kitchenType}>
                        <Text style={styles.title}>Type(s) de cuisine(s)</Text>
                        <FlatList
                            scrollEnabled={false}
                            data={kitchen}
                            renderItem={renderKitchenType}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={styles.diet}>
                        <Text style={styles.title}>Un régime alimentaire en particulier ?</Text>
                        <View style={styles.renderDiet} >
                            <FlatList
                                scrollEnabled={false}
                                data={diet}
                                numColumns={3}
                                renderItem={renderDiet}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </View>
                    <View style={styles.level}>
                        <Text style={styles.title}>Niveau de cuisine</Text>
                        <FlatList
                            scrollEnabled={false}
                            data={levelData}
                            renderItem={renderLevel}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </ScrollView>
                <View style={postCreateStyles.header}>
                    <TouchableOpacity style={postCreateStyles.crossView} onPress={() => navigation.navigate('Home')}>
                        <Image style={postCreateStyles.cross} source={require("../../assets/icon/cross.png")} />
                    </TouchableOpacity>
                </View>
                {/* <PublishFooterNav firstScreen={false} lastScreen={false} disabledButton={buttonDisable} onPressBack={navigation.goBack} onPressContinue={onPressContinue} /> */}
                <SignupFooterNav
                disabledButton={buttonDisable}
                title="Suivant"
                onPressBack={navigation.goBack}
                onPressContinue={onPressContinue}
                canGoBack = {true}
                ></SignupFooterNav>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.backgroundColor,
    },

    title: {
        ...sharedStyles.h3
    },

    containerDate: {
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: colors.thirdBlue
    },

    chooseTextDate: {
        color: colors.thirdBlue,
        fontWeight: '500',
        fontSize: 14,
        width: '95%'
    },

    selectDate: {
        width: 6,
        height: 10
    },

    containerSelectDate: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },

    guestInput: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: colors.orange1
    },

    kitchenType: {
        marginTop: 40
    },

    renderKitchenType: {
        height: 44,
        backgroundColor: 'white',
        marginTop: 15,
        alignItems: "center",
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: 'space-between'
    },

    textKitchenType: {
        ...sharedStyles.shortText,
        marginLeft: 15
    },

    checkImage: {
        width: 21,
        height: 21
    },

    diet: {
        marginTop: 40
    },

    viewDiet: {
        backgroundColor: colors.green1,
        width: 110,
        height: 110,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4
    },

    imageDiet: {
        width: 46,
        height: 46
    },

    textDiet: {
        fontWeight: '500',
        fontSize: 13,
        color: colors.darkGreen,
        marginTop: 10
    },

    viewDietTrue: {
        backgroundColor: colors.orange1,
        width: 110,
        height: 110,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4
    },

    textDietTrue: {
        fontWeight: '500',
        fontSize: 13,
        color: 'black',
        marginTop: 10
    },

    renderDiet: {
        marginTop: 10
    },

    level: {
        height: 400,
        marginTop: 40
    },

})