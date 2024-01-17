/* eslint-disable prettier/prettier */
import { StyleSheet, Text, SafeAreaView, ScrollView, Pressable, View, Image } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Icon from 'react-native-vector-icons/FontAwesome';
// import Card from '../../components/Card'
// import card from '../../components/card';
import Card from '../../components/Card';
import { TextInput } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
const FindLawyer = ({navigation}) => {
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 3, value: 3 },
        { label: 4, value: 4 },
    ]);
    const category = ['Criminal', 'Family', 'Divorce', 'Property', 'Civil', 'Imigiration', 'Buisness', 'Prosecutor', 'Tax']
    const [activeChip, setActiveChip] = useState(category[0]);

    const handleChipPress = (category) => {
        setActiveChip(category);
    };
    const filterHandler = () =>{
        setFilter(!filter)
    }
    return (
        <>
            <Header />
            <ScrollView style={styles.mainContainer}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',margin:10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../assets/images/landmark.png')} />
                        <Text style={styles.Heading}>Find Lawyer</Text>
                    </View>
                    <Icon name="filter" size={24} color="#000" onPress={filterHandler}/>
                </View>
                {filter && <SafeAreaView style={{ height: '10%', margin: 10 }}>
                    <SafeAreaView>
                        <TextInput
                            style={styles.input}
                            placeholder="search with city name"
                        //   onChangeText={(text) => setEmail(text)}
                        //   value={email}
                        />
                        <View style={styles.dropDownw}>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                placeholder="filter with experience"
                            />
                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={styles.chipContainer}>
                            {category.map((category, i) => (
                                <Pressable
                                    key={i}
                                    style={[
                                        styles.chips,
                                        {
                                            backgroundColor: activeChip === category ? '#151E70' : '#D9D9D9',
                                        },
                                    ]}
                                    onPress={() => handleChipPress(category)}
                                >
                                    <Text style={{ color: activeChip === category ? '#ffff' : '#000000' }}>{category}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </SafeAreaView>

                </SafeAreaView>}
                <SafeAreaView >
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </SafeAreaView>
            </ScrollView>
            <Footer />
        </>
    )
}

export default FindLawyer

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#FFFF",
        flex: 1,
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
    input: {
        borderWidth: 1,
        backgroundColor: "white",
        borderColor: "gray",
        // borderRadius: RFPercentage(4),
        padding: RFPercentage(1.2),
        fontFamily: "Cabin-Regular",
        fontSize: RFPercentage(1.7),
        paddingLeft: RFPercentage(4),
        marginTop: RFPercentage(2),
    },
});
