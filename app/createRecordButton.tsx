import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CreateRecordButton = ({
  setShowCreateRecord,
  showCreateRecord,
}: {
  setShowCreateRecord: any;
  showCreateRecord: any;
}) => {
  return (
    <View style={styles.button}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowCreateRecord(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
    position: "sticky",

    // Fix position issue on Android
    elevation: 2, // Proper elevation for Android
    zIndex: 9999,

    // Fix shadow issue
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CreateRecordButton;
