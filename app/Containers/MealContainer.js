import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import postApi from "../services/postApi";
import { colors } from "../utils/colors";
import moment from "moment";
import { useUserContext } from "../context/UserContext";
import { PostListItemComponent } from "../Components/PostListItemComponent";
import { PostListLilItemComponent } from "../Components/PostListItemLilComponent";

export default function MealContainer({ navigation }) {

    const userContext = useUserContext()
    const [event, setEvent] = React.useState({ todayEvent: [],futureEvent: [], pastEvent: []})

    //On ajoute un state event qui rassemblera les trois tableau (facilite la lisibilité et évite le rerender sur les trois states ?)
    // const [todayEvent, setTodayEvent] = React.useState([])
    // const [futureEvent, setFutureEvent] = React.useState([])
    // const [pastEvent, setPastEvent] = React.useState([])

    React.useEffect(() => {
        getPosts()
    }, [])

    async function getPosts() {
        const posts = await postApi.getEvent(userContext.authState.user.id)
        const postToday = []
        const postFuture = []
        const postPast = []
        //Foreach à la place de map car plus perfoment si on ne fait pas de retour
        posts.forEach((data) => {
            //Pas besoin du deuxième if dans le if car le else finale est (Un if dans un If prend plus de ressource qu'un && et else if prend plus de ressource qu'un else)
            if(moment(data.attributes.datetime).format('L') === moment().format('L') && moment(data.attributes.datetime).format('LT') > moment().format('LT')){
                    postToday.push(data)
            }else if(moment(data.attributes.datetime).format('L') > moment().format('L')){
                postFuture.push(data)
            }else{
                postPast.push(data)
            }
        })
        setEvent({todayEvent: postToday, futureEvent: postFuture, pastEvent:postPast})
        // setTodayEvent(postToday)
        // setFutureEvent(postFuture)
        // setPastEvent(postPast)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.top}>
                    <Text style={styles.h1}>Mes Foods</Text>
                </View>
                {event.todayEvent.length > 0 &&
                    <View style={styles.nextEvent}>
                        <Text style={styles.eventTitle}>C'est pour bientôt !</Text>
                        {event.todayEvent.map((data, index) => (
                            <View key={index}>
                                <PostListItemComponent item={data} index={index} navigateTo={() => navigation.navigate("PostDetail", {index: data.id})}/>
                            </View>
                        ))}
                    </View>
                }
                <View style={{marginTop: 30}}>
                    <Text style={styles.eventTitle}>Mes prochains évènements</Text>
                    {event.futureEvent.length > 0 ?
                        <View>
                            {event.futureEvent.map((data, index) => (
                                <View key={index}>
                                    <PostListLilItemComponent item={data} index={index} navigateTo={() => navigation.navigate("PostDetail", {index: data.id})}/>
                                </View>
                            ))}
                        </View>
                    :
                        <Text>Vous n'avez pas d'évènements à venir</Text>
                    }
                </View>
                <View style={{marginTop: 30, marginBottom: 30}}>
                    <Text style={styles.eventTitle}>Archives</Text>
                    {event.pastEvent.length > 0 ?
                        <View>
                            {event.pastEvent.map((data, index) => (
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    },

    h1: {
        fontWeight: '600',
        fontSize: 30,
        color: colors.primaryBlue
    },

    top: {
        marginTop: 60,
    },

    nextEvent: {
        marginTop: 30,
    },

    eventTitle: {
        fontWeight: '600',
        fontSize: 18,
        color: colors.primaryBlue
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
        padding: 20,
    }

})