/* eslint-disable prettier/prettier */
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../components/Footer';
const PersonalDetails = () => {
    return (
        <>
            <ScrollView style={{ flex: 1 }}>
                <SafeAreaView>
                    <View style={{ backgroundColor: '#151E70', width: '100%', height: 70 }}>
                        <View style={{ display: 'flex', flexDirection: "row", margin: 20, gap: 20 }}>
                            <Image source={require('../../assets/images/userVector.png')} />
                            <Text style={{ color: '#FFFF', fontSize: 25 }}>My Profile</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 70 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={styles.image} source={require('../../assets/images/Dummy.png')} />
                            <Text style={{ color: '#FFFFFF', fontSize: 35, marginLeft: 5, color: '#000000', fontFamily: 'Inter-Bold' }}>Jon Doe</Text>
                        </View>
                    </View>
                    <View style={{display : 'flex' ,flexDirection : 'row',justifyContent : 'space-between',margin : 60}}>
                       
                        <View>
                            <Text style={{fontSize : 18, color : '#000000',fontFamily : 'Inter-Bold'}}>First Name</Text>
                            <Text style={{fontSize : 18, color : '#000000',fontFamily : 'Inter-Bold'}}> john</Text>
                        </View>
                        <View>
                            <Text style={{fontSize : 18, color : '#000000',fontFamily : 'Inter-Bold'}}>Last Name</Text>
                            <Text style={{fontSize : 18, color : '#000000',fontFamily : 'Inter-Bold'}}>Does</Text>
                        </View>
                    </View>
                    <View style={{marginTop : 20}}>
                       <Text></Text> 
                    </View>
                </SafeAreaView>
            </ScrollView>
            <Footer></Footer>
        </>
    )
}

export default PersonalDetails

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginRight: 15,
    },
})