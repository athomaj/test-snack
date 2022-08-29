import React from "react";
import { ActivityIndicator, Dimensions, FlatList, Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/colors";
import chatApi from "../../services/chatApi";
import { useUserContext } from "../../context/UserContext";

export default function ChatDetailsContainer({ chatId, closeModal }) {
    const userContext = useUserContext()

    const [chat, setChat] = React.useState(null)
    const [chatMessages, setChatMessages] = React.useState([])
    const [message, setMessage] = React.useState('')

    const [loading, setLoading] = React.useState(false)

    const textInputRef = React.useRef()

    React.useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const response = await chatApi.getChat(chatId)
            
            setChat(response.data.attributes)
            setChatMessages(response.data.attributes.messages.data)
        } catch (error) {
            console.log(error, 'ERR GET CHAT DETAIL')
        }
    }

    async function updateChat() {
        if (message.length === 0) {
          return;
        }
        try {
          setLoading(true);
    
          const idArray = chatMessages.map((item) => ({ id: item.id }));
    
          console.log(idArray);
    
          const res = await chatApi.createMessage({
            data: {
              message: message,
              type: "default",
              user: { id: userContext.authState.user.id },
              date: new Date().getTime(),
            },
          });
    
          await chatApi.update(chatId, {
            data: {
              messages: [...idArray, { id: res.data.id }],
            },
          });
    
          fetchData();
          textInputRef.current?.clear();
          setLoading(false);
        } catch (error) {
          console.log("err update chat ====", error);
        }
    }

    const renderMessage = ({ item, index }) => (
        <View style={{flexDirection: 'row', width: Dimensions.get('screen').width, paddingHorizontal: 20, marginTop: 35}}>
            <Image style={styles.picture} source={{uri: item.attributes.user.data.attributes.avatarUrl}}/>
            <View style={{width: '75%'}}>
                <Text style={styles.title2}>
                    {item.attributes.user.data.attributes.username}
                    <Text style={{color: colors.orange1}}>
                        {chat.post.data.attributes.user.data.id === item.attributes.user.data.id ? ' (Hôte)' : ''}
                    </Text>
                    <Text style={{fontSize: 12}}>
                        {'  ' + new Date(item.attributes.date).toLocaleTimeString().substring(0,5)}
                    </Text>
                </Text>
                <Text>{item.attributes.message}</Text>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior='position' style={{width: '100%', height: '100%'}} contentContainerStyle={{height: '100%', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: '10%'}}>
                    <View style={{height: 70, width: '25%', justifyContent: 'center', alignItems: 'center'}}>
                        {chat &&
                            <Image style={{height: 50, width: '90%', borderRadius: 4, resizeMode: 'cover'}} source={{uri: chat.post.data.attributes.pictures.data[0].attributes.url}}/>
                        }
                    </View>
                    <View style={{width: '75%', paddingLeft: 10}}>
                        <TouchableOpacity>
                            <Text style={{textDecorationLine: 'underline'}}>{chat?.post.data.attributes.title}</Text>
                        </TouchableOpacity>
                        <Text style={{marginTop: 3}}>{new Date(chat?.post.data.attributes.datetime).toLocaleDateString()} à {new Date(chat?.post.data.attributes.datetime).toLocaleTimeString().substring(0,2)}h</Text>
                    </View>
                    <TouchableOpacity onPress={closeModal} style={{position: 'absolute',left: 0, height:40, width: 40, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={require('../../assets/exitModal.png')}></Image>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={chatMessages}
                    renderItem={renderMessage}
                    contentContainerStyle={{paddingTop: 20}}
                />
                <View style={{position: 'absolute', bottom: 10, flexDirection: 'row', width: Dimensions.get('screen').width, paddingHorizontal: 10}}>
                    <TextInput ref={textInputRef} onChangeText={(text) => setMessage(text)} style={{ height: 40, width: '85%', paddingHorizontal: 15, borderRadius: 5, backgroundColor: 'white'}} placeholderTextColor="#00473C" placeholder="Ecrire un message"></TextInput>
                    <View style={{height: 40, width: '15%', alignItems: 'flex-end'}}>
                        {loading ?
                        <View style={{height:40, width: 40, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator animating={loading} color={colors.black} hidesWhenStopped={true}></ActivityIndicator>
                        </View>
                        :
                        <TouchableOpacity onPress={updateChat} style={{height:40, width: 40, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E2AE4E'}}>
                            <Image style={{height:15, width: 30, resizeMode: 'contain'}} source={require('../../assets/icon/sendMessage.png')} />
                        </TouchableOpacity>
                        }
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F3E7'
    },

    h1: {
        fontWeight: '600',
        fontSize: 18,
        color: colors.primaryBlue
    },

    top: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },

    falseTrue: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20
    },

    isTrue: {
        width: '45%',
        height: 35,
        backgroundColor: colors.fourthBlue,
        justifyContent: "center",
        alignItems: "center"
    },

    isFalse: {
        width: '45%',
        height: 35,
        backgroundColor: colors.whiteBlue,
        justifyContent: "center",
        alignItems: "center"
    },

    textTrue: {
        fontWeight: '500',
        fontSize: 13,
        color: colors.white
    },

    flatlist: {
        marginLeft: 20,
        marginTop: 30
    },

    render: {
        flexDirection: "row",
        marginBottom: 30
    },

    picture: {
        width: 54,
        height: 54,
        borderRadius: 27,
        borderWidth: 1.6,
        borderColor: colors.thirdBlue,
        marginRight: 10
    },

    name: {
        fontWeight: '700',
        fontSize: 12,
        color: colors.thirdBlue
    },

    title: {
        fontWeight: '500',
        fontSize: 12,
        color: colors.thirdBlue,
    },

    title2: {
        fontWeight: '500',
        fontSize: 14,
        color: colors.darkGreen,
        width: '60%'
    },

    description: {
        fontWeight: '600',
        fontSize: 10,
        color: colors.thirdBlue
    },

    typeDate: {
        fontWeight: '500',
        fontSize: 10,
        color: colors.fifthBlue,
        marginTop: 5
    },

    containerRight: {
        justifyContent: "center"
    },
})

