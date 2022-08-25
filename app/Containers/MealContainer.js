import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import postApi from "../services/postApi";
import { colors } from "../utils/colors";
import moment from "moment";
import { useUserContext } from "../context/UserContext";
import { PostListItemComponent } from "../Components/PostListItemComponent";
import { PostListLilItemComponent } from "../Components/PostListItemLilComponent";
import { sharedStyles } from "../utils/styles";

export default function MealContainer({ navigation }) {

    const userContext = useUserContext()

    const [todayEvent, setTodayEvent] = React.useState([])
    const [futureEvent, setFutureEvent] = React.useState([])
    const [pastEvent, setPastEvent] = React.useState([])

    React.useEffect(() => {
        getPosts()
    }, [])

    async function getPosts() {
        const posts = await postApi.getEvent(userContext.authState.user.id)
        const postToday = []
        const postFuture = []
        const postPast = []
        posts.map((data) => {
            const dateOfPost = moment(data.attributes.datetime).format('LT').includes('PM') ? parseInt(moment(data.attributes.datetime).format('LT').slice(0, data.attributes.datetime.indexOf(':')-1))+12 : parseInt(moment(data.attributes.datetime).format('LT').slice(0, data.attributes.datetime.indexOf(':')-1))
            const dateNow = moment().format('LT').includes('PM') ? parseInt(moment().format('LT').slice(0,moment().format('LT').indexOf(':')))+12 : parseInt(moment().format('LT').slice(0,moment().format('LT').indexOf(':')))

            console.log(moment().format('LT').indexOf(':')-1)
            if(moment(data.attributes.datetime).format('L') === moment().format('L') && dateOfPost > dateNow){
                    postToday.push(data)
               
            }else if(moment(data.attributes.datetime).format('L') > moment().format('L')){
                postFuture.push(data)
            }else{
                postPast.push(data)
                console.log(data.attributes.title, dateOfPost, 'AND', dateNow)
            }
        })
        setTodayEvent(postToday)
        setFutureEvent(postFuture)
        setPastEvent(postPast)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.top}>
                    <Text style={styles.h1}>Mes Foods</Text>
                </View>
                {todayEvent.length > 0 ?
                    <View style={styles.nextEvent}>
                        <Text style={styles.eventTitle}>C'est pour bientôt !</Text>
                        {todayEvent.map((data, index) => (
                            <View key={index}>
                                <PostListItemComponent item={data} index={index} navigateTo={() => navigation.navigate("PostDetail", {index: data.id})}/>
                            </View>
                        ))}
                    </View>
                :
                    <></>
                }
                <View style={{marginTop: 30, paddingHorizontal: 15}}>
                    <Text style={styles.eventTitle}>Mes prochains évènements</Text>
                    {futureEvent.length > 0 ?
                        <View>
                            {futureEvent.map((data, index) => (
                                <View key={index}>
                                    <PostListLilItemComponent item={data} index={index} navigateTo={() => navigation.navigate("PostDetail", {index: data.id})}/>
                                </View>
                            ))}
                        </View>
                    :
                        <Text>Vous n'avez pas d'évènements à venir</Text>
                    }
                </View>
                <View style={{marginTop: 30, marginBottom: 30, paddingHorizontal: 15}}>
                    <Text style={styles.eventTitle}>Archives</Text>
                    {futureEvent.length > 0 ?
                        <View>
                            {pastEvent.map((data, index) => (
                                <View key={index}>
                                    <PostListLilItemComponent item={data} index={index} navigateTo={() => navigation.navigate("PostDetail", {index: data.id})}/>
                                </View>
                            ))}
                        </View>
                    :
                        <Text>Vous n'avez pas d'évènements passé</Text>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        ...sharedStyles.wrapperHeaderSpace,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    h1: {
        ...sharedStyles.h1
    },

    top: {
        marginTop: 60,
    },

    nextEvent: {
        width: '100%',
        backgroundColor: colors.beige1,
        marginTop: 30,
        padding:  15
    },

    eventTitle: {
        fontWeight: '600',
        fontSize: 18,
        color: colors.darkGreen
    },

    picture: {
        width: 105,
        height: 76,
        borderRadius: 5
    },

    futureContainer: {
        flexDirection: "row",
        marginTop: 20
    },

    scroll: {
        width: '100%',
        height: '100%',
    }

})