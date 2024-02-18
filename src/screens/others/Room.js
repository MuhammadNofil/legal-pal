/* eslint-disable prettier/prettier */
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../components/Footer';
import axios from 'axios';
import baseUrl from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Room = ({ navigation }) => {
    const [roomData, setRoomData] = useState([])
    const [user, setUser] = useState({})
    const getRoom = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const roomData = await axios.get(`${baseUrl}chats`, {
                headers: {
                    Authorization: token
                }
            })
            const _user = await axios.get(`${baseUrl}user`, {
                headers: {
                    Authorization: token
                }
            })
            setRoomData(roomData?.data?.data)
            setUser(_user?.data?.data)
            console.log(user)
            console.log(roomData?.data?.data[0].users[0])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getRoom()
    }, [])
    return (
        <>
            <ScrollView style={{ backgroundColor: '#151E70' }} >
                <SafeAreaView >
                    <View style={{ backgroundColor: '#151E70', width: '100%', height: 70 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20, gap: 10 }}>
                            <Image source={require('../../assets/images/notification2.png')} style={{ marginTop: 4 }} />
                            <Text style={{ color: '#FFFF', fontSize: 25 }}>Messages</Text>
                        </View>
                    </View>
                    <ScrollView>
                        <SafeAreaView>
                            {
                                roomData?.map((e, i) => {
                                    const a = e?.users.filter((e)=>{
                                          return e?._id !== user?._id 
                                    })
                                    console.log(a,'kkkkk')
                                    const otherUser = e.users.find(user => user._id !== user._id);
                                    console.log(otherUser,'sasas')
                                    return (
                                        <View key={i}> 
                                            <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: 20 }} onPress={() => e?.status === "pending" ? "" : navigation.navigate("ChatRoom",{roomId : e?._id , userId : user._id })} >
                                                <Image source={require("../../assets/images/Dummy.png")} style={{ width: 70, height: 70, borderRadius: 35 }} />
                                                <View style={{ marginLeft: 15 }}>
                                                    <Text style={{ color: '#FFFF', fontSize: 14, fontFamily: "Inter-Bold" }}>{a[0]?.userName}</Text>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                                        <View style={{ backgroundColor: e?.status === "pending" ? "yellow" : "green", height: 10, width: 10, borderWidth: 1, borderRadius: 20 }}></View>
                                                        <Text style={{ marginLeft: 5, color: '#FFFF', fontSize: 14, fontFamily: "Inter-Bold" }}>{e?.status === "pending" ? `you can not chat until ${new Date(e?.activeDate).toISOString().split('T')[0]}` : e?.lastMessage}</Text>

                                                    </View>
                                                </View>
                                            </Pressable>
                                            <View style={{ height: 5, width: "100%", backgroundColor: "#FFFF" }}></View>
                                        </View>
                                    )
                                })
                            }
                        </SafeAreaView>


                    </ScrollView>
                </SafeAreaView>
            </ScrollView>
            <Footer />
        </>
    )
}

export default Room

const styles = StyleSheet.create({
    image: {
        // marginTop : 10,
        width: 150,
        height: 150,
        borderRadius: 100,
        marginRight: 15,
    },
    // marginTop: 15,
    //     height: 5,
    //     width: '100%',
    //     backgroundColor: '#FFFF'
})