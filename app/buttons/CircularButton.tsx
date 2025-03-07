import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CircularButton = ({ title, onPress, backgroundColor, position }:{
    title: string;
    onPress: () => void;
    backgroundColor: string;
    position: {
        top?: number;
        left?: number;
        right?: number;
    }
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, position]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0, // Move buttons to the top
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default CircularButton;