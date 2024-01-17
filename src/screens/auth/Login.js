/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function Login({navigation}){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View>
      </View>
      <View>
      <Text style={styles.loginHeading}>Login</Text>
      <Image source={require("../../assets/images/bg.png")} style={styles.abc}/>
      </View>
      <View style={styles.formContainer}>
        
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Pressable style={styles.forgotPassword} onPress={()=>navigation.navigate('ResetPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </Pressable>
        <Pressable style={styles.buttonLogin} onPress={()=>navigation.navigate('Home Page')}>
          <Text style={styles.button}>Login</Text>
        </Pressable>
        <View style={styles.signupContainer}>
          <Text style={styles.signupTextLeft}>Don't have an account?</Text>
          <Pressable style={styles.signupButton} onPress={()=>navigation.navigate('Signup')}>
            <Text style={styles.signupButtonText}>Signup</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center", 
    alignItems: "center",
    // paddingTop: RFPercentage(5), 
  },
  loginHeading: {
    // top : RFPercentage(6),
    color : '#051744',
    fontFamily: "Inter-Bold",
    textAlign: "center", // Align text to the left
    fontSize: RFPercentage(6), // Responsive font size
  },
  formContainer: {
    top : RFPercentage(6),
    width: "80%",
  },
  input: {
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: RFPercentage(4), 
    padding: RFPercentage(1.2), 
    fontFamily: "Cabin-Regular",
    fontSize: RFPercentage(1.7), 
    paddingLeft: RFPercentage(4), 
    marginTop: RFPercentage(2), 
  },
  forgotPassword: {
    fontFamily: "Inter-Bold",
    alignSelf: "flex-end",
    marginTop: RFPercentage(1), 
    color : '#051744',
  },
  forgotPasswordText: {
    fontFamily: "Inter-Bold",
    color: "#051744",
    textDecorationLine: "none",
    fontSize: RFPercentage(1.8), // Responsive font size
  },
  buttonLogin: {
    fontFamily: "Inter-Bold",
    backgroundColor: "#051744",
    borderColor: "#051744",
    borderWidth: 2,
    padding: RFPercentage(1.5), // Responsive padding
    borderRadius: RFPercentage(4), // Responsive border radius
    alignItems: "center",
    marginTop: RFPercentage(2), // Responsive margin top
  },
  button: {
    textAlign: "center",
    fontSize: RFPercentage(2.3), // Responsive font size
    color: "white",
    fontFamily: "Inter-Bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center", // Align to the center
    marginTop: RFPercentage(3), // Responsive margin top
  },
  signupTextLeft: {
    color : '#051744',
    fontFamily: "Inter-Bold",
    fontSize: RFPercentage(2), // Responsive font size
    color: "black", // or any color you prefer
    marginRight: RFPercentage(1), // Responsive margin right
  },
  signupButton: {
    padding: 0, // Remove padding
  },
  signupButtonText: {
    textAlign: "center",
    fontSize: RFPercentage(2), // Responsive font size
    color: "#051744", // Red color
    fontFamily: "Inter-Bold",
  },
  abc :{
    top : RFPercentage(4),
    // color : "black"
    // height : "50%",
    // width : "80%"
  }
});
