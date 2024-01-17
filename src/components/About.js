/* eslint-disable prettier/prettier */
import { StyleSheet, Text, SafeAreaView, ScrollView, Pressable, View, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const About = () => {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.heading}>About</Text>
            <Text style={styles.para}> Molestias at, inventore nobis laborum incidunt, necessitatibus quaerat ratione consequatur ipsum labore, ab fugit corporis. Vero aliquid expedita iure odio minima commodi quod reprehenderit blanditiis omnis dolorum optio modi aperiam dolore, culpa dicta, beatae eligendi autem quos neque itaque quidem nam. Labore!</Text>
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#F3F2F2',
        borderWidth: 1,
        margin: 10,
        padding: 15,
        marginTop: 4
    },
    heading : {
        fontSize : 20,
        color : "#000000",
        fontFamily : "Inter-Bold"
    },
    para : {
        fontSize : 14,
        color : "#000000",
        fontFamily : "Inter-Bold"
    },
    
})