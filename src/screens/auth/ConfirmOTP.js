import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function ConfirmOTP({ navigation }) {
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const codeRefs = useRef([useRef(null), useRef(null), useRef(null), useRef(null)]);

  const handleCodeChange = (text, index) => {
    if (!/^\d+$/.test(text)) {
      setError("Please enter only digits");
    } else {
      setError("");
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length === 1 && index < codeRefs.current.length - 1) {
      codeRefs.current[index + 1].current.focus();
    }
  };

  const handleBackspace = (text, index) => {
    if (text.length === 0 && index > 0) {
      codeRefs.current[index - 1].current.focus();
    }
  };

  const handleSubmit = () => {
    // Check for error and non-digit characters
    if (error || code.some((value) => !/^\d+$/.test(value))) {
      setError("Please enter only digits in all fields");
    } else {
      setError("");
      navigation.navigate('New Password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Verification</Text>
      <Text style={styles.label}>Enter Verification Code</Text>
      <View style={styles.codeInputContainer}>
        {code.map((value, index) => (
          <TextInput
            key={index}
            ref={codeRefs.current[index]}
            style={styles.codeInput}
            onChangeText={(text) => handleCodeChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(code[index], index);
              }
            }}
            value={value}
            maxLength={1}
            keyboardType="numeric"
          />
        ))}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
      <Pressable style={styles.resendCode} onPress={() => {}}>
        <Text style={styles.resendCodeText}>
          Didn't Receive a Code?{" "}
          <Text style={styles.resendtextemail}>Resend</Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  text:{
    color  :"#051744",
    fontFamily: "Cabin-Regular",
    marginTop:RFPercentage(15),
    fontSize:RFPercentage(4),
  },
  label: {
    color : "#000000",
    fontFamily: "Cabin-Regular",
    fontSize: RFPercentage(2.5),
    marginBottom: RFPercentage(6),
    marginTop: RFPercentage(9),
  },
  codeInputContainer: {
    flexDirection: "row",

  },
  codeInput: {
    backgroundColor:'#051744',
    // borderColor : "#FFFFFF",
    // borderBlockColor : "#FFFFFF",
    padding:  RFPercentage(1.4),
    fontFamily: "Cabin-Regular",
    fontSize:  RFPercentage(2),
    margin:  RFPercentage(2),
    width: "12%",
    textAlign: "center",
    color:'white',
  },
  submitButton: {
    backgroundColor: "#051744",
    borderColor: "#051744",
    borderWidth: 2,
    padding: 8,
    borderRadius: 25,
    width: "40%",
    alignItems: "center",
    marginTop: RFPercentage(6),
  },
  buttonText: {
    textAlign: "center",
    fontSize: RFPercentage(2),
    color: "#FFFFFF",
    fontFamily: "Cabin-Regular",
  },
  resendCode: {
    marginTop: RFPercentage(5),
  },
  resendCodeText: {
    fontSize: RFPercentage(1.7),
    color: "black",
    fontFamily: "Cabin-Regular",
  },
  resendtextemail: {
    fontSize: RFPercentage(1.7),
    color: "#051744",
    fontFamily: "Cabin-Regular",
  },
  errorText: {
    color: "red",
    fontFamily: "Cabin-Regular",
    fontSize: RFPercentage(1.7),
    marginTop: RFPercentage(2),
  },
});
