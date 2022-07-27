import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, ScrollView, FlatList, SafeAreaView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import moment from "moment";

import { colors } from "../utils/colors";

import { kitchenTypeData } from "../fakeData/kitchenType";
import { dietData } from "../fakeData/diet";
import { levelData } from "../fakeData/level";
import { categoryData } from "../fakeData/category";

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

    React.useEffect(() => {
        console.log("FILTERS HOEM ====", filters)
        if (filters) {
            const filtersCopy = JSON.parse(JSON.stringify(filters))
            setDate(new Date(filtersCopy.date))
            setDateValue(filtersCopy.dateValue)
            setDistrict(filtersCopy.district)
            setKitchen(filtersCopy.kitchen)
            setDiet(filtersCopy.diet)
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
        <TouchableOpacity style={styles.renderKitchenType} onPress={() => kitchenTypeChange(index)}>
            <Text style={styles.textKitchenType}>{item.title}</Text>
            {item.status === true ?
                <Image style={styles.checkImage} source={require('../assets/icon/check.png')} />
                : null
            }
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
        <TouchableOpacity style={styles.renderKitchenType} onPress={() => levelChange(index)}>
            <Text style={styles.textKitchenType}>{item.title}</Text>
            {item.status === true ?
                <Image style={styles.checkImage} source={require('../assets/icon/check.png')} />
                : null
            }
        </TouchableOpacity>
    );

    function levelChange(index) {
        const data = [...level]
        data[index].status = !data[index].status
        setLevel(data)
    }


    function createDiet() {
        const copy = [...dietData]
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
                <ScrollView style={{ height: '100%', width: '100%' }} contentContainerStyle={{ paddingTop: 68, paddingBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
                    <View style={styles.category}>
                        <FlatList
                            scrollEnabled={false}
                            data={categoryData}
                            renderItem={renderCategory}
                            numColumns={3}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={styles.date}>
                        <Text style={styles.textDate}>Quelle date vous interesse ?</Text>
                        {Platform.OS === 'ios' ?
                            <View style={{ alignItems: 'flex-start', width: '100%', paddingTop: 5 }}>
                                <DateTimePicker
                                    display="compact"
                                    mode="date"
                                    style={{ width: 132 }}
                                    value={date}
                                    onChange={onChange}
                                />
                            </View>
                            :
                            <TouchableOpacity style={styles.containerDate} onPress={showDatePicker}>
                                {dateValue === null ?
                                    <Text style={styles.chooseTextDate}>Choisir une date</Text>
                                    :
                                    <Text style={styles.chooseTextDate}>{moment(date).format('D/MM/YYYY')}</Text>
                                }
                                {/* <TouchableOpacity style={styles.containerSelectDate} onPress={showDatePicker}> */}
                                <Image style={styles.selectDate} source={require('../assets/icon/select.png')} />
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
                        <Text style={styles.titles}>Type(s) de cuisine(s)</Text>
                        <FlatList
                            scrollEnabled={false}
                            data={kitchen}
                            renderItem={renderKitchenType}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={styles.diet}>
                        <Text style={styles.titles}>Un régime alimentaire en particulier ?</Text>
                        <FlatList
                            scrollEnabled={false}
                            data={diet}
                            numColumns={3}
                            renderItem={renderDiet}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={styles.date}>
                        <Text style={styles.textDate}>Dans quelle quartier ?</Text>
                        <View style={styles.containerDate}>
                            <SelectDropdown
                                data={districts}
                                defaultValue={district}
                                defaultButtonText={"Clique pour choisir un quartier"}
                                buttonStyle={{ backgroundColor: colors.white, height: 30, width: '100%' }}
                                buttonTextStyle={{ color: colors.thirdBlue, fontWeight: '500', fontSize: 14, textAlign: 'left', width: '100%' }}
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
                        </View>
                    </View>
                    <View style={styles.level}>
                        <Text style={styles.titles}>Type(s) de cuisine(s)</Text>
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
        backgroundColor: colors.white,
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
        marginTop: 10
    },

    textDate: {
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


    kitchenType: {
        height: 450
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
        height: 400
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


    level: {
        height: 350
    },



    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
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
        backgroundColor: colors.thirdBlue,
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    textDelete: {
        fontWeight: '600',
        fontSize: 14,
        textDecorationLine: "underline",
        color: colors.thirdBlue
    },

    textSearch: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 14
    },

    category: {
        marginTop: 40,
        marginBottom: 30
    }
})