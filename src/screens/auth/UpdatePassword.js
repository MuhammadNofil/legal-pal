/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least 2 symbols")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function UpdatePassword({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

  const handlePasswordChange = (text) => {
    setPassword(text);
    setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate({ password, confirmPassword }, { abortEarly: false });
      // If validation is successful, navigate to the next screen or perform other actions
      navigation.navigate("Login");
    } catch (error) {
      error.inner.forEach((err) => {
        setErrors((prevErrors) => ({ ...prevErrors, [err.path]: err.message }));
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>New Password</Text>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Enter New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="*Password"
          secureTextEntry
          onChangeText={handlePasswordChange}
          value={password}
        />
        <Text style={styles.errorText}>{errors.password}</Text>
        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="*Confirm Password"
          secureTextEntry
          onChangeText={handleConfirmPasswordChange}
          value={confirmPassword}
        />
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      </View>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    alignItems: "center",
  },
  text: {
    color : "#051744",
    fontFamily: "Inter-Bold",
    marginTop: RFPercentage(15),
    fontSize: RFPercentage(4),
  },
  labelContainer: {
    
    width: "80%",
    marginTop: RFPercentage(4),
  },
  label: {
    color : "#000000",
    fontFamily: "Inter-Bold",
    fontSize: RFPercentage(2.2),
    marginBottom: RFPercentage(3),
    marginTop: RFPercentage(4),
  },
  input: {
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 25,
    padding: RFPercentage(0.5),
    fontFamily: "Inter-Bold",
    fontSize: RFPercentage(2),
    paddingLeft: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#051744",
    padding: RFPercentage(1.5),
    borderRadius: 25,
    width: "70%",
    alignItems: "center",
    marginTop: RFPercentage(5),
  },
  buttonText: {
    textAlign: "center",
    fontSize: RFPercentage(2),
    color: "white",
    fontFamily: "Inter-Bold",
  },
  errorText: {
    color: "red",
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(0.5),
    marginLeft: RFPercentage(1.3),
  },
});
