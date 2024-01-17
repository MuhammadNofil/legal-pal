/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// import axios from "axios";
import {RFPercentage} from 'react-native-responsive-fontsize';
// import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must contain at least 8 characters'),
    name: yup
      .string()
      .required('Username is Required')
      .min(8, 'Username must contain atleast 8 Characters'),
    confirmpassword: yup
      .string()
      .required('Confirm the Password')
      .oneOf([yup.ref('password'), null], 'Password must Match'),
  });

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, isloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'User', value: 'user'},
    {label: 'Lawyer', value: 'lawyer'},
  ]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {label: 'Criminal', value: 'criminal'},
    {label: 'Family', value: 'family'},
  ]);
  const [dropDown,setDropdown] = useState(false)
  const handleSelection = data => {
    console.log(data)
    if (data === 'lawyer') {
        console.log('lawyer')
        setDropdown(true)
    }else{
        setDropdown(false)
    }
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    },
  });
  const onPressSend = async formData => {
    // console.log(formData);
    // const {name,password,email} = formData
    // const data = {name,password,email}
    // try {
    //   const signUp = await axios.post('https://8a9e-39-34-140-124.ngrok-free.app/user/register',data)
    //   isloading(true);
    //   console.log(signUp.data);
    //   if (signUp?.data?.success){
    //     navigation.navigate('Login');
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.registerHeading}>Profile Informations</Text>
      {/* <Text style={styles.subHeading}>lets help you meet up your task</Text> */}
      {/* <Image source={require('../../assets/images/profilepic.webp')} style={styles.imageUploader}/> */}
      <View style={styles.formContainer}>
        <Text style={styles.placeholder}>City</Text>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Enter Email ID"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={styles.warning}>{errors.email.message}</Text>
        )}
        <Text style={styles.placeholder}>Address</Text>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Enter a Username"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text style={styles.warning}>{errors.name.message}</Text>
        )}
        <Text style={styles.placeholder}>Phone</Text>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Enter Your Password"
              secureTextEntry={true}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {errors?.password && (
          <Text style={styles.warning}>{errors?.password.message}</Text>
        )}
        {/* {errors?.confirmpassword && <Text style={styles.warning}>{errors?.confirmpassword.message}</Text>} */}
        <View style={styles.dropDownw}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="What are you?"
            onChangeValue={(selectedValue) => handleSelection(selectedValue)}
          />
        </View>
        {dropDown && <View style={styles.dropDownw}>
          <DropDownPicker
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
            placeholder="LawyerType"
          />
        </View>}
        <Pressable
          style={styles.buttonregister}
          onPress={handleSubmit(onPressSend)}
          disabled={loading ? true : false}>
          <Text style={styles.button}>Submit</Text>
        </Pressable>
        <View style={styles.container}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    top: '5%',
    left: '3%',
    fontSize: RFPercentage(2),
    fontFamily: 'Inter-Bold',
    color: '#051744',
  },
  dropDownw: {
    marginTop: '10%',
    // borderRadius : 30
  },
  imageUploader: {
    // width : "70%"
    marginTop: '5%',
    height: '20%',
    borderRadius: 50,
    // borderColor : "#0000"
  },
  tag: {
    marginTop: '5%',
    marginLeft: '18%',
    fontSize: RFPercentage(2),
    color: '#051744',
    fontFamily: 'Inter-Bold',

    // alignItems : 'center',
    // justifyContent : 'center'
  },
  registerHeading: {
    fontFamily: 'Inter-Bold',
    color: '#051744',
    textAlign: 'center',
    fontSize: RFPercentage(5),
    marginBottom: '2%',
  },
  subHeading: {
    fontFamily: 'Inter-Bold',
    color: '#051744',
    marginBottom: '2%',
    marginTop: '2%',
    fontSize: RFPercentage(2),
  },
  formContainer: {
    width: '80%',
  },
  input: {
    fontFamily: 'Inter-Bold',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
    padding: RFPercentage(1),
    backgroundColor: 'white',
    fontSize: RFPercentage(1.7),
    paddingLeft: 20,
    marginTop: '9%',
  },
  buttonregister: {
    backgroundColor: '#051744',
    borderColor: '#051744',
    borderWidth: 2,
    padding: RFPercentage(1.5),
    borderRadius: 25,
    alignItems: 'center',
    marginTop: '13%',
  },
  button: {
    textAlign: 'center',
    fontSize: RFPercentage(2),
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
  warning: {
    color: '#E8505B',
    fontSize: RFPercentage(1.5),
    paddingTop: '1%',
    paddingLeft: 9,
  },
});
