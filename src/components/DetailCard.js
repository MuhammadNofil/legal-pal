/* eslint-disable prettier/prettier */
import { StyleSheet, Text, SafeAreaView, ScrollView, Pressable, View, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const DetailCard = () => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/Dummy.png')}
                    style={styles.image}
                />
                <View style={styles.headerText}>
                    <Text style={styles.name}>John Smith</Text>
                    <Text style={styles.experience}>Criminal Lawyer</Text>
                    <Text style={styles.experience}>6 Years Experience</Text>
                    <Text style={styles.experience}>
                        <Icon name="map-marker" size={20} color="#151E70" /> Karachi
                    </Text>
                </View>
            </View>
            <View style={styles.divider}></View>

            <View style={styles.details}>
                <View style={styles.detailColumn}>
                    <Icon name="phone" size={20} color="#151E70" />
                    <Text style={styles.detailItem}>(123) 456-7890</Text>
                </View>
                <View style={styles.detailColumn}>
                    <Icon name="envelope" size={20} color="#151E70" />
                    <Text style={styles.detailItem}>lawyer@gmail.com</Text>
                </View>
            </View>
            <Text style={styles.detailItem} >
                <Icon name="map-marker" size={20} color="#151E70" />
                A block,sector 32, Gulshan e Iqbal, Karachi, Pakistan</Text>
        </View>
    )
}

export default DetailCard

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#F3F2F2',
        borderWidth: 1,
        // borderRadius: 10,
        // elevation: 3,
        margin: 10,
        padding: 15,
        marginTop: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        marginTop: 15,
        height: 5,
        width: '100%',
        backgroundColor: '#FFFF'
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginRight: 15,
    },
    headerText: {
        flex: 1,
        marginLeft: 25,
    },
    name: {
        fontSize: 30,
        color: "#151E70",
        fontFamily: "Inter-Bold"
    },
    experience: {
        fontSize: 16,
        color: "#151E70",
        fontFamily: "Inter-Bold"
    },
    details: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailColumn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    detailItem: {
        fontSize: 16,
        marginLeft: 5,
        color: "#151E70",
        fontFamily: "Inter-Bold"
    },
    footer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#151E70",
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: '100%',
    },
    footerItem: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: "Inter-Bold",
    }
})