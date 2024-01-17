/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().required("*Email is required").email("*Invalid email"),
});

export default function ResetPassword({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    // Check if the form is valid and email is not empty
    if (Object.keys(errors).length === 0 && data.email.trim() !== "") {
      // Proceed to the next page
      navigation.navigate("Verification");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Forget Password</Text>
      <Text style={styles.text}>Enter your Registered Email Address</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="example:waffles@gmail.com"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.warning}>{errors.email.message}</Text>}
      <Pressable style={styles.sendButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.sendButtonText}>Send</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  warning: {
    color: "red",
    fontSize: RFPercentage(1.7),
    marginTop: "2%",
    marginLeft: "13%",
    alignSelf:'flex-start',
    fontFamily: "Cabin-Regular",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  label: {
    color  :'#051744',
    fontFamily: "Inter-Bold",
    fontSize: RFPercentage(5),
    marginTop: RFPercentage(20),
  },
  text: {
    color : "#000000",
    fontFamily: "Inter-Bold",
    marginTop: RFPercentage(15),
    marginBottom: RFPercentage(4),
    fontSize: RFPercentage(2.2),
  },
  input: {
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 25,
    padding: 7,
    fontFamily: "Cabin-Regular",
    fontSize: RFPercentage(1.5),
    paddingLeft: RFPercentage(3),
    marginTop: 10,
    width: "80%",
  },
  sendButton: {
    backgroundColor: "#051744",
    borderColor: "#051744",
    borderWidth: 2,
    padding: 7,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
    marginTop: 22,
  },
  sendButtonText: {
    textAlign: "center",
    fontSize: RFPercentage(2),
    color: "white",
    fontFamily: "Inter-Bold",
  },
});
