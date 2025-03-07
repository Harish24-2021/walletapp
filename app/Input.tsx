import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const Input = () => {
  const [number, setNumber] = useState("");

  const handleChange = (value: any) => {
    const filteredValue = value.replace(/[^0-9]/g, "");
    setNumber(filteredValue);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Amount..."
        keyboardType="numeric" // Ensures numeric keyboard on mobile
        maxLength={10} // Limits to 10 digits
        value={`${number} ₹`}
        onChangeText={handleChange}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  output: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default Input;
