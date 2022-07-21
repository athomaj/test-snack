import React from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/colors";
import PublishFooterNav from "../../Components/Utils/PublishFooterNav";
import { usePublishContext } from "../../context/PublishContext";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { kitchenTypeData } from "../../fakeData/kitchenType";
import { dietData } from "../../fakeData/diet";
import { levelData } from "../../fakeData/level";

export default function PublishPost3({ navigation }) {

    const publishContext = usePublishContext()

    const [buttonDisable, setButtonDisable] = React.useState(false)
    const [dateValue, setDateValue] = React.useState(null)
    const [show, setShow] = React.useState(false)
    const [date, setDate] = React.useState(new Date())
    const [seats, setSeats] = React.useState()
    const [kitchen, setKitchen] = React.useState([])
    const [diet, setDiet] = React.useState([])
    const [level, setLevel] = React.useState([])

    const closeModal = () => {
        navigation.navigate('Home')
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
        createKitchen()
        createDiet()
        createLevel()
    }, [])

    function createKitchen(){
        const cKitchen = kitchenTypeData.map((data, index) => {
            data["status"] = false
            data['id'] = index
            return data
        })
        setKitchen(cKitchen)
    }

    function createDiet(){
        const cDiet = dietData.map((data, index) => {
            data["status"] = false
            data['id'] = index
            return data
        })
        setDiet(cDiet)
    }

    function createLevel(){
        const cLevel = levelData.map((data, index) => {
            data["status"] = false
            data['id'] = index
            return data
        })
        setLevel(cLevel)
    }


    function kitchenTypeChange(index){
        const data = [...kitchenTypeData]
        data[index].status = !data[index].status
        setKitchen(data)
    }

    function dietChange(index){
        const data = [...dietData]
        data[index].status = !data[index].status
        setDiet(data)
    }

    function levelChange(index){
        const data = [...levelData]
        data[index].status = !data[index].status
        setLevel(data)
    }


    const renderKitchenType = ({ item, index }) => (
        <TouchableOpacity style={styles.renderKitchenType} onPress={() => kitchenTypeChange(index)}>
            <Text style={styles.textKitchenType}>{item.title}</Text>
            {item.status === true ?
                <Image style={styles.checkImage} source={require('../../assets/icon/check.png')}/>
            :null
            }
        </TouchableOpacity>
    );

    const renderDiet = ({ item, index }) => (
        <TouchableOpacity onPress={() => dietChange(index)}>
            {item.status === true ?
            <View style={styles.viewDietTrue}>
                <Image style={styles.imageDiet} source={require('../../assets/icon/whiteCarrot.png')}/>
                <Text style={styles.textDietTrue}>{item.title}</Text>
            </View>
            :
                <View style={styles.viewDiet}>
                    <Image style={styles.imageDiet} source={require('../../assets/icon/blueCarrot.png')}/>
                    <Text style={styles.textDiet}>{item.title}</Text>
                </View>
            }
        </TouchableOpacity>
    );

    const renderLevel = ({ item, index }) => (
        <TouchableOpacity style={styles.renderKitchenType} onPress={() => levelChange(index)}>
            <Text style={styles.textKitchenType}>{item.title}</Text>
            {item.status === true ?
                <Image style={styles.checkImage} source={require('../../assets/icon/check.png')}/>
            :null
            }
        </TouchableOpacity>
    );

    return(
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <View style={styles.date}>
                    <Text style={styles.title}>Quelle date vous interesse ?</Text>
                    <View style={styles.containerDate}>
                        {dateValue === null ?
                            <Text style={styles.chooseTextDate}>Choisir une date</Text>
                        :
                            <Text style={styles.chooseTextDate}>{moment(date).format('D/MM/YYYY')}</Text>
                        }
                        <TouchableOpacity style={styles.containerSelectDate} onPress={showDatePicker}>
                            <Image style={styles.selectDate} source={require('../../assets/icon/select.png')}/>
                        </TouchableOpacity>
                        {show &&
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={'date'}
                                is24Hour={true}
                                onChange={onChange}
                            />
                        }
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>Nombre d'invité ?</Text>
                    <TextInput style={styles.guestInput} placeholder={'Choisir un nombre de place'} placeholderTextColor={colors.thirdBlue} value={seats} onChangeText={(e) => setSeats(e)} keyboardType={"number-pad"} />
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
                        data={level}
                        renderItem={renderLevel}
                        keyExtractor={item => item.id}
                    />
                </View>
            </ScrollView>
            <View style={styles.header}>
                <Text style={styles.titleHeader}>Détail du repas</Text>
                <TouchableOpacity style={styles.crossView} onPress={closeModal}>
                    <Image style={styles.cross} source={require("../../assets/icon/cross.png")} />
                </TouchableOpacity>
            </View>
            <PublishFooterNav disabledButton= {buttonDisable} onPressBack={navigation.goBack} onPressContinue={() => navigation.navigate('PublishPost4')} updatecontext={() => publishContext.updatePublish3(date, seats, kitchen, diet, level)}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.white,
        padding: 15
    },

    header: {
        height: 100,
        width: '100%',
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white
    },

    titleHeader: {
        marginTop: 30,
        fontWeight: '500',
        fontSize: 15,
        color: colors.primaryBlue
    },

    cross: {
        width: 18,
        height: 18,
    },

    crossView: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 47,
        left: 342
    },


    date: {
        height: 100,
        marginTop: 110
    },

    title: {
        color: colors.primaryBlue,
        fontWeight: '500',
        fontSize: 15,
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
        borderBottomColor: colors.thirdBlue
    },

    kitchenType: {
        marginTop: 40
    },

    renderKitchenType: {
        height: 44,
        backgroundColor: colors.secondaryBlue,
        marginTop: 20,
        alignItems: "center",
        borderRadius: 4,
        flexDirection: "row",
    },

    textKitchenType: {
        color: colors.primaryBlue,
        left: 20,
        fontWeight: '500',
        fontSize: 15,
        width: '90%'
    },

    checkImage: {
        width: 21,
        height: 21
    },

    diet: {
        marginTop: 40
    },

    viewDiet: {
        backgroundColor: colors.secondaryBlue,
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
        color: colors.primaryBlue,
        marginTop: 10
    },

    viewDietTrue: {
        backgroundColor: colors.thirdBlue,
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
        color: colors.white,
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