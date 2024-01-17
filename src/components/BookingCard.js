/* eslint-disable prettier/prettier */
import { StyleSheet, Text, SafeAreaView, ScrollView, Pressable, View, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const BookingCard = () => {
    const [selected, setSelected] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Skype', value: 'skype' },
        { label: 'Call', value: 'call' },
        { label: 'Message', value: 'message' },
        { label: 'Visit To My Location', value: 'visit' },
    ]);
    const category = ['12:00','3:00','4:00','6:00']
    const [activeChip, setActiveChip] = useState(category[0]);

    const handleChipPress = (category) => {
        setActiveChip(category);
    };
    return (
        <View style={styles.cardContainer}>
            <Text style={{color : "#000000",fontSize : 16,margin : 8, fontFamily : 'Inter-Bold'}}>Select Service</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="select medium of communication"
            />
            <View style={{marginTop : 15}}>
            <Text style={{color : "#000000",fontSize : 16,margin : 8, fontFamily : 'Inter-Bold'}}>Select Date</Text>
                <Calendar
                    // Customize the appearance of the calendar
                    style={{
                        borderWidth: 1,
                        borderColor: 'gray',
                        height: 350
                    }}
                    // Specify the current date
                    current={'2024-1-14'}
                    // Callback that gets called when the user selects a day
                    onDayPress={day => {
                        console.log('selected day', day);
                    }}
                    // Mark specific dates as marked
                    markedDates={{
                        '2012-03-01': { selected: true, marked: true, selectedColor: 'blue' },
                        '2012-03-02': { marked: true },
                        '2012-03-03': { selected: true, marked: true, selectedColor: 'blue' }
                    }}
                />
            </View>
            <Text style={{color : "#000000",fontSize : 16,margin : 8, fontFamily : 'Inter-Bold'}}> Select Time</Text>
            <View style={{display :"flex",flexDirection : "row" , flexWrap : 'nowrap' , marginTop : 10}}>
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
            </View>
        </View>
    )
}

export default BookingCard

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#F3F2F2',
        borderWidth: 1,
        // height: 2000,
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
        width: 75,
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
})