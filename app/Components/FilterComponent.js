import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, ScrollView, FlatList, SafeAreaView, Platform, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import moment from "moment";
import { colors } from "../utils/colors";
import { kitchenTypeData } from "../fakeData/kitchenType";
import { levelData } from "../fakeData/level";
import { categoryData } from "../fakeData/category";
import { sharedStyles } from "../utils/styles";
import dietApi from "../services/dietApi";
import { BASE_URL } from "../config/config";
import kitchenApi from "../services/kitchenApi";


const WIDTHCONTAINER = (Dimensions.get('window').width / 3) - 21;

export default function FilterComponent({ filters, closeModal, updateFilters }) {

    const [date, setDate] = React.useState(new Date())
    const [show, setShow] = React.useState(false)
    const [dateValue, setDateValue] = React.useState(null)
    const [district, setDistrict] = React.useState(null)
    const [kitchen, setKitchen] = React.useState([])
    const [diet, setDiet] = React.useState([])
    const [level, setLevel] = React.useState([])
    const [category, setCategory] = React.useState(null)
    
    const districts = ["13001", "13002", "13003", "13004", "13005", "13006", "13007", "13008", "13009", "13010", "13011", "13012", "13013", "13014", "13015", "13016"]

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

    React.useEffect(() => {
        callDiet()
        callKitchen()
        if (filters) {
            const filtersCopy = JSON.parse(JSON.stringify(filters))
            setDate(new Date(filtersCopy.date))
            setDateValue(filtersCopy.dateValue)
            setDistrict(filtersCopy.district)
            setLevel(filtersCopy.level)
            setCategory(filtersCopy.category)
            return
        }
        createKitchen()
        createDiet()
        createLevel()
    }, [])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDateValue(1)
        setShow(false);
        setDate(currentDate);
    };

    const showDatePicker = () => {
        setShow(true);
    };

    const renderCategory = ({ item, index }) => (
        <TouchableOpacity onPress={() => setCategory(item.title)}>
            {category === item.title ?
                <View style={styles.viewDietTrue}>
                    <Image style={styles.imageDiet} source={require('../assets/icon/whiteCarrot.png')} />
                    <Text style={styles.textDietTrue}>{item.title}</Text>
                </View>
                :
                <View style={styles.viewDiet}>
                    <Image style={styles.imageDiet} source={require('../assets/icon/blueCarrot.png')} />
                    <Text style={styles.textDiet}>{item.title}</Text>
                </View>
            }
        </TouchableOpacity>
    )

    function createKitchen() {
        const copy = [...kitchenTypeData]
        const cKitchen = copy.map((data, index) => {
            data["status"] = false
            data['id'] = index
            return data
        })
        setKitchen(cKitchen)
    }

    const renderKitchenType = ({ item, index }) => (
        <TouchableOpacity style={{...sharedStyles.inputText, marginVertical: 5, justifyContent: 'center', backgroundColor: item.status ? colors.purple1 : 'white'}} onPress={() => kitchenTypeChange(index)}>
            <Text style={{...sharedStyles.shortText, color: item.status ? 'black' : colors.darkGreen}}>{item.title}</Text>
        </TouchableOpacity>
    );

    function kitchenTypeChange(index) {
        const data = [...kitchen]
        data[index].status = !data[index].status
        setKitchen(data)
    }


    function createLevel() {
        const copy = [...levelData]
        const cLevel = copy.map((data, index) => {
            data["status"] = false
            data['id'] = index
            return data
        })
        setLevel(cLevel)
    }

    const renderLevel = ({ item, index }) => (
        <TouchableOpacity style={{...sharedStyles.inputText, marginBottom: 10, justifyContent: 'center', backgroundColor: item.status ? colors.blue1 : 'white'}} onPress={() => levelChange(index)}>
            <Text style={{...sharedStyles.shortText, color: item.status ? 'black' : colors.darkGreen}}>{item.title}</Text>
        </TouchableOpacity>
    );

    function levelChange(index) {
        const data = [...level]
        data[index].status = !data[index].status
        setLevel(data)
    }


    function createDiet() {
        const copy = [...diet]
        const cDiet = copy.map((data, index) => {
            data["status"] = false
            data['id'] = index
            return data
        })
        setDiet(cDiet)
    }

    const renderDiet = ({ item, index }) => (
        <TouchableOpacity style={styles.renderDiet} onPress={() => dietChange(index)}>
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

    function dietChange(index) {
        const data = [...diet]
        data[index].status = !data[index].status
        setDiet(data)
    }


    function deleteAll() {
        createKitchen()
        createDiet()
        createLevel()
        setDistrict(null)
        setDateValue(null)
        setCategory(null)
        setDate(new Date())

        updateFilters(null, false)
    }

    function display() {
        const filterData = {
            date: date,
            dateValue: dateValue,
            kitchen: kitchen,
            diet: diet,
            district: district,
            level: level,
            category: category
        }
        updateFilters(filterData, true)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height: '100%', width: '100%' }}>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Recherche d'évènements</Text>
                    <TouchableOpacity style={styles.backTouch} onPress={closeModal}>
                        <Text style={styles.back}>{'<'}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{...sharedStyles.wrapperHeaderSpace}} contentContainerStyle={{paddingBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
                    <View style={styles.category}>
                        <Text style={{...sharedStyles.h1}}>Envie de quoi aujourd’hui?</Text>
                        <Text style={{...sharedStyles.p, marginBottom: 10}}>Véritables moments de convivialité partagée, ils peuvent être thématiques, chez un membre ou à l’extérieur, le midi ou le soir...</Text>
                        <FlatList
                            scrollEnabled={false}
                            data={categoryData}
                            renderItem={renderCategory}
                            numColumns={3}
                            keyExtractor={item => item.id}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                        />
                    </View>
                    <View style={styles.date}>
                        <Text style={{...sharedStyles.h3}}>Quelle date vous interesse ?</Text>
                        {Platform.OS === 'ios' ?
                            <View style={{...sharedStyles.bottomCaesura, alignItems: 'flex-start', width: '100%', paddingVertical: 7, flexDirection: 'row', justifyContent: "space-between"}}>
                                <Text style={{...sharedStyles.shortText, color: colors.darkGreen, paddingBottom: 5}}>{show ? moment(date).format('D/MM/YYYY') :'Choisir une date'}</Text>
                                <Image source={require('../assets/icon/iconNext.png')} style={{width: 6, height: 10, resizeMode: 'contain'}}/>
                                <DateTimePicker
                                    display="compact"
                                    mode="date"
                                    style={{ opacity: 0.02, width: 115, position: "absolute", left: 0 }}
                                    value={date}
                                    onChange={() => (onChange, setShow(true))}
                                />
                            </View>
                            :
                            <TouchableOpacity style={styles.containerDate} onPress={showDatePicker}>
                                {dateValue === null ?
                                    <Text style={{...sharedStyles.shortText, color: colors.darkGreen}}>Choisir une date</Text>
                                    :
                                    <Text style={{...sharedStyles.shortText, color: colors.darkGreen}}>{moment(date).format('D/MM/YYYY')}</Text>
                                }
                                {/* <TouchableOpacity style={styles.containerSelectDate} onPress={showDatePicker}> */}
                                <Image style={styles.selectDate} source={require('../assets/icon/iconNext.png')} />
                                {/* </TouchableOpacity> */}
                                {show &&
                                    <DateTimePicker
                                        value={date}
                                        mode={'date'}
                                        is24Hour={true}
                                        onChange={onChange}
                                    />
                                }
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.kitchenType}>
                        <Text style={{...sharedStyles.h3, marginBottom: 10}}>Type(s) de cuisine(s)</Text>
                        <FlatList
                            scrollEnabled={false}
                            data={kitchen}
                            renderItem={renderKitchenType}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={styles.diet}>
                        <Text style={{...sharedStyles.h3, marginBottom: 10}}>Un régime alimentaire en particulier ?</Text>
                        <FlatList
                            scrollEnabled={false}
                            data={diet}
                            numColumns={3}
                            renderItem={renderDiet}
                            keyExtractor={item => item.id}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                        />
                    </View>
                    <View style={styles.date}>
                        <Text style={{...sharedStyles.h3, marginBottom: 10}}>Dans quelle quartier ?</Text>
                        <View style={styles.containerDate}>
                            <SelectDropdown
                                data={districts}
                                defaultValue={district}
                                defaultButtonText={"Clique pour choisir un quartier"}
                                buttonStyle={{ backgroundColor: colors.backgroundColor, height: 30, width: '100%'}}
                                buttonTextStyle={{ color: colors.darkGreen, fontWeight: '500', fontSize: 14, textAlign: 'left', width: '100%', marginLeft: 0 }}
                                onSelect={(selectedItem, index) => {
                                    setDistrict(selectedItem)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />
                            <Image style={styles.selectDate} source={require('../assets/icon/iconNext.png')} />
                        </View>
                    </View>
                    <View style={styles.level}>
                        <Text style={{...sharedStyles.h3, paddingBottom: 10}}>Type(s) de cuisine(s)</Text>
                        <FlatList
                            scrollEnabled={false}
                            data={level}
                            renderItem={renderLevel}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.deleteAll} onPress={deleteAll}>
                            <Text style={styles.textDelete}>Tout effacer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.searchAll} onPress={display}>
                            <View style={styles.imageSearchSize}>
                                <Image style={styles.imageSearch} source={require('../assets/icon/whiteSearch.png')} />
                            </View>
                            <Text style={styles.textSearch}>Rechercher</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    header: {
        zIndex: 1,
        position: 'absolute',
        top: 0,
        height: 58,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundColor,
    },

    textHeader: {
        width: '100%',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: colors.primaryBlue,
    },

    back: {
        color: colors.primaryBlue,
        fontWeight: '500',
        fontSize: 22,
        width: 14,
        height: 33
    },

    backTouch: {
        position: 'absolute',
        left: 20,
        height: 30,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
    },

    date: {
        height: 90,
        marginBottom: 60
    },

    textDate: {
        color: colors.primaryBlue,
        fontWeight: '500',
        fontSize: 15,
    },

    containerDate: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: colors.orange1
    },

    chooseTextDate: {
        color: colors.thirdBlue,
        fontWeight: '500',
        fontSize: 14,
        width: '95%'
    },

    selectDate: {
        width: 6,
        height: 10,
        position: 'absolute',
        right: 0
    },

    containerSelectDate: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },


    kitchenType: {
        marginBottom: 60
    },

    titles: {
        color: colors.primaryBlue,
        fontWeight: '500',
        fontSize: 15
    },

    renderKitchenType: {
        height: 44,
        backgroundColor: colors.secondaryBlue,
        marginTop: 20,
        alignItems: "center",
        borderRadius: 4,
        flexDirection: "row"
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
        marginBottom: 60
    },

    viewDiet: {
        backgroundColor: colors.green1,
        width: WIDTHCONTAINER,
        height: WIDTHCONTAINER,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        marginVertical: 6
        
    },

    imageDiet: {
        width: 46,
        height: 46
    },

    textDiet: {
        fontWeight: '500',
        fontSize: 13,
        color: 'black',
        marginTop: 10
    },

    viewDietTrue: {
        backgroundColor: colors.orange1,
        width: WIDTHCONTAINER,
        height: WIDTHCONTAINER,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        marginVertical: 6
    },

    textDietTrue: {
        fontWeight: '500',
        fontSize: 13,
        color: colors.darkGreen,
        marginTop: 10
    },


    level: {
        marginBottom: 40
    },



    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 30
    },

    deleteAll: {
        width: 147,
        justifyContent: "center",
        alignItems: "center",
    },

    imageSearch: {
        width: 19,
        height: 19,
    },

    imageSearchSize: {
        width: 40,
        height: 40,
        justifyContent: "center"
    },

    searchAll: {
        width: 147,
        height: 43,
        backgroundColor: colors.darkGreen,
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    textDelete: {
        fontWeight: '600',
        fontSize: 14,
        textDecorationLine: "underline",
        color: colors.darkGreen
    },

    textSearch: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 14
    },

    category: {
        marginTop: 40,
        marginBottom: 60
    }
})