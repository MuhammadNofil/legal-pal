/* eslint-disable prettier/prettier */
import { StyleSheet, Text, SafeAreaView, ScrollView, Pressable, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Icon from 'react-native-vector-icons/FontAwesome';
// import Card from '../../components/Card'
// import card from '../../components/card';
import Card from '../../components/Card';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DetailCard from '../../components/DetailCard';
import About from '../../components/About';
import BookingCard from '../../components/BookingCard';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../../constants';
import PageLoader from '../../components/PageLoader';
const CreateAppointment = ({ navigation, route }) => {
    const { data } = route.params
    const [bodyData, seBodyDate] = useState({
        date: null,
        time: '',
        lawyer: data?._id,
        medium: ''
    })
    const [error, setError] = useState(false)
    const [errorMessage, setErrroMessage] = useState('')
    const [value, setValue] = useState(null);
    const [appointmentData, setAppointmentData] = useState([])
    const [isLoading, setLoading] = useState(true)
    // form validation
    const validateFormData = () => {
        const errors = {};

        // Validate date
        if (!bodyData.date) {
            errors.date = "Date is required";
        }

        // Validate time
        if (!bodyData.time) {
            errors.time = "Time is required";
        }

        // Validate medium
        if (!bodyData.medium) {
            errors.medium = "Medium is required";
        }

        return errors;
    };

    // get all the appointment of the lawyer to check the availibiltiy
    const getAppointMentData = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            console.log(token)
            const response = await axios.get(`${baseUrl}appointement/getAllData/${data?._id}`, {
                headers: {
                    Authorization: token,
                },
            })
            console.log(response?.data?.status,'helllooo')
            if (response?.data?.status === 200) {
                console.log(response.data.data)
                setAppointmentData(response?.data?.data)
                setLoading(false)
                
            }
        } catch (error) {
            console.log(error?.response?.data)
        }
    }

    // create Appointment
    const createAppointment = async () => {
        console.log(bodyData,'bodyDate')
        try {
            if (value) {
                bodyData.medium = value
            }
            const errors = validateFormData();

            // Check if there are any errors
            if (Object.keys(errors).length === 0) {
                const token = await AsyncStorage.getItem('token')
                const response = await axios.post(`${baseUrl}appointement`, bodyData, {
                    headers: {
                        Authorization: token,
                    },
                })
                console.log(response.data)
            } else {
                setErrroMessage("please fill all the data");
                setError(true)
            }
        } catch (error) {
            setErrroMessage(error?.response?.data?.message)
            setError(true)
        }
    }

    useEffect(() => {
        getAppointMentData()
    }, [])
    return (
        <>
            {
                isLoading ? (<PageLoader />) : (
                    <>
                        <Header />
                        <ScrollView style={styles.mainContainer}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../assets/images/landmark.png')} />
                                    <Text style={styles.Heading}>Create Appointment</Text>
                                </View>
                            </View>
                            <SafeAreaView >
                                <DetailCard data={data} />
                                <BookingCard bodyData={bodyData} value={value} setValue={setValue} appointmentData={appointmentData} />
                                {error && <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                    <Text style={{ color: 'red', fontFamily: 'Inter-Bold', fontSize: 16 }}>{errorMessage}</Text>
                                </View>}
                                <View style={{ margin: 10 }}>
                                    <Pressable style={styles.footer} onPress={createAppointment}>
                                        <Text style={styles.footerItem}>Create Appointment</Text>
                                    </Pressable>
                                </View>
                            </SafeAreaView>

                            {/* <View style={{margin : 10}}>
                    </View> */}
                        </ScrollView>
                        <Footer />
                    </>
                )
            }
        </>
    )
}

export default CreateAppointment

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#FFFF",
        // flex: 1,
    },
    footer: {
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: "#151E70",
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: '100%',
        // margin: 10
    },
    footerItem: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: "Inter-Bold",
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
    dropDownw: {
        marginTop: '2%',
        // borderWidth :1,
        borderRadius: 50
    },
    Heading: {
        fontSize: 25,
        marginLeft: 10,
        color: "#000000",
        fontFamily: "Inter-Bold",
        // marginLeft : 10  
    },
});
