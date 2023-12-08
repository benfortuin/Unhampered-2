import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import React from "react";
import styles from "../styles/styles";

// now unused error screen when debugging react navigation
const ErrorScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Error</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default ErrorScreen;
