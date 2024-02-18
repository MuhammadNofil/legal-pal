/* eslint-disable prettier/prettier */
import { TextInput, StyleSheet, Text, SafeAreaView, ScrollView, Pressable, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
// import { TextInput } from 'react-native-gesture-handler'
import { RFPercentage } from 'react-native-responsive-fontsize'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import baseUrl from '../../constants'

const dummyData = [
];
const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [loading, isLoading] = useState(false);
    const onSendMessage = () => {
        if (inputText.trim() === '') {
            console.log('byee')
            return;
        }

        const newMessage = {
            id: messages.length + 1,
            text: inputText,
            user: { id: 1, name: 'User' }, // Assume the user ID is 1 for simplicity
        };

        setMessages([...messages, newMessage]);
        setInputText('');
    };
    const scrollViewRef = useRef();
    const scrollToBottom = () => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const chatHandler = async () => {
        if (inputText.length === 0) {
            console.log(0);
            return;
        }

        // try {
        //     const newMessage = {
        //         id: messages.length + 1,
        //         text: inputText,
        //         user: { id: 2, name: 'to' }
        //     };
        //     setMessages(prevMessages => [...prevMessages, newMessage]);
        //     isLoading(true);

        //     const response = await axios.get(`${baseUrl}auth/chat?q=${inputText}`);
        //     // 
        //     if (response?.data) {
        //         setInputText("")
        //         const newResponseMessage = {
        //             id: messages.length + 2, 
        //             text: response.data,
        //             user: { id: 1, name: 'From' }
        //         };
        //         setMessages(prevMessages => [...prevMessages, newResponseMessage]);

        //     }

        //     isLoading(false);
        try {
            const newMessage = {
                id: messages.length + 1,
                text: inputText,
                user: { id: 2, name: 'to' }
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);
            isLoading(true);
            const response = await axios.get(`${baseUrl}auth/openApi?q=${inputText}`);
            console.log(response?.data)
            if (response?.data) {
                setInputText("")
                const newResponseMessage = {
                    id: messages.length + 2,
                    text: response.data?.data,
                    user: { id: 1, name: 'From' }
                };
                setMessages(prevMessages => [...prevMessages, newResponseMessage]);

            }
            isLoading(false);

        } catch (error) {
            console.log(error, 'ssssss');
        }
    };

    return (
        <>
            <Header />
            <SafeAreaView style={styles.mainContainer}>
                <ScrollView contentContainerStyle={{ padding: 15 }}>
                    <View style={{ backgroundColor: '#151E70', height: 150, flex: 1, padding: 5, flexDirection: "row" }}>
                        <Image source={require("../../assets/images/bot.png")} />
                        <Text style={{ color: '#FFFF', fontSize: 25, marginTop: 40, marginLeft: 10 }}>Legal Assistant</Text>
                    </View>

                    <SafeAreaView style={styles.mainContainer}>
                        <ScrollView
                            ref={scrollViewRef}
                            contentContainerStyle={styles.messagesContainer}
                            onContentSizeChange={scrollToBottom}
                        >
                            <View style={styles.container}>
                                <View style={styles.messagesContainer}>
                                    {messages?.map((item) => (
                                        <View
                                            key={item.id}
                                            style={item.user.id === 1 ? styles.toMessage : styles.fromMessage}>
                                            <Text style={styles.messageText}>{item.text}</Text>
                                        </View>
                                    ))}
                                    {
                                        loading && <View
                                            style={styles.toMessage}>
                                            <Text style={styles.messageText}>typing...</Text>
                                        </View>
                                    }
                                </View>
                                <View style={styles.inputContainer}>
                                </View>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </ScrollView>
            </SafeAreaView>

            <View style={styles.AgreementContainer}>
                <View style={{ width: '89%' }}>
                    <TextInput
                        onChangeText={newText => setInputText(newText)}
                        placeholder="Ask a question"
                        multiline={true}
                        style={{ width: "90%" }}
                        value={inputText}
                    />
                </View>

                <TouchableOpacity style={styles.verifyButton} onPress={chatHandler} disabled={loading}>
                    <Icon name="send" size={24} color="black" />
                </TouchableOpacity>
            </View>


            <Footer></Footer>
        </>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    AgreementContainer: {
        backgroundColor: "#FFF",
        // backgroundColor: "white",
        borderColor: "gray",
        borderRadius: RFPercentage(4),
        borderWidth: 1, // Set border width to 0
        alignItems: 'center'
    },
    verifyButton: {
        position: 'absolute',
        alignSelf: 'center',
        right: 15,
        top: 15
    },

    iconcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    // input: {
    //     flex: 1,
    //     paddingVertical: 10,
    // },
    iconContainer: {
        padding: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
    },
    messagesContainer: {
        flex: 1,
        // marginBottom: ,

    },
    fromMessage: {
        alignSelf: 'flex-end',
        backgroundColor: 'green',
        color: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 8,
        maxWidth: '70%',
    },
    toMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#151E70',
        padding: 15,
        borderRadius: 8,
        marginBottom: 8,
        maxWidth: '70%',
        marginTop: 5
    },
    messageText: {
        fontSize: 14,
        color: "#FFFF",
        fontFamily: "Inter-Bold"
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    sendButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: RFPercentage(1.5),
        paddingHorizontal: RFPercentage(2),
        borderRadius: RFPercentage(4),
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: RFPercentage(1.7),
    },
    mainContainer: {
        // flex: 1,
        backgroundColor: 'red',
        marginBottom: 30
    },
    input: {
        borderWidth: 0,
        // backgroundColor: "white",
        // borderColor: "gray",
        // borderRadius: RFPercentage(4),
        // borderWidth: 0, // Set border width to 0
        borderColor: 'transparent',
        padding: RFPercentage(1.2),
        fontFamily: "Cabin-Regular",
        fontSize: RFPercentage(1.7),
        paddingLeft: RFPercentage(4),
        marginTop: RFPercentage(2),
        alignContent: 'center',
        color: "#000000"
    },
    Title: {
        fontSize: 16,
        color: '#000000',
        fontFamily: 'Inter-Bold',
    },
    cardImage: {
        height: 150,
        width: 150,
    },
    col: {
        alignItems: 'center', // Add this line to center the items
        borderWidth: 1,
        // ... other styles
    },
    app: {
        marginTop: 10,
        flex: 4, // the number of columns you want to devide the screen into
        marginHorizontal: 15,
        // margin : 10,
        // width: 200,
        // backgroundColor: "red",
        justifyContent: "center",
        alignContent: 'center',
        alignItems: 'center'

    },
    row: {
        flexDirection: "row"
    },
    "1col": {
        // backgroundColor: "lightblue",
        // borderColor: "#fff",
        // borderWidth: 1,
        flex: 1
    },
    "2col": {
        // backgroundColor: "green",
        // borderColor: "#fff",
        // borderWidth: 1,
        flex: 2
    },
    "3col": {
        // backgroundColor: "orange",
        // borderColor: "#fff",
        borderWidth: 1,
        flex: 3
    },
    "4col": {
        // backgroundColor: "green/",
        // borderColor: "green",
        borderWidth: 1,
        flex: 4
    },
    mainContainer: {
        flex: 1,
    },
    heading: {
        fontFamily: 'Inter-Bold',
        fontSize: 20,
        color: '#000000',
        marginLeft: 9
    },
    chipContainer: {
        display: 'flex',
        flexDirection: 'row', // Arrange chips horizontally
        marginTop: 18,
        justifyContent: 'space-between', // Add this line to space chips evenly
    },
    chips: {
        borderRadius: 50,
        borderColor: '#D9D9D9',
        backgroundColor: '#D9D9D9',
        width: 106,
        alignItems: 'center',
        padding: 8,
        marginHorizontal: 5,
        // Other styles as needed
    },

    chipText: {
        fontSize: 16,
        color: '#151E70',
        fontFamily: "Inter-Bold",
    },
    topRated: {
        marginTop: 10,
        paddingHorizontal: 16, // Add horizontal padding to the content container
    },
    image: {
        borderRadius: 10, // Add borderRadius or any other styles as needed
    },
    imageTextContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        padding: 5,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
    },
    imageText: {
        color: '#fff',
        fontSize: 30,
    },
});
