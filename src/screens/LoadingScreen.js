import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import React from "react";
import styles from "../styles/styles";
import { MaterialIcons } from "@expo/vector-icons";

// loading screen in case screen does not return somehow -- mostly for debugging react navigation
const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.title, styles.span]}>
        {/* title: */}

        <MaterialIcons name="local-laundry-service" size={50} color="black" />
        <Text style={[styles.text, styles.title_text]}>Unhampered</Text>
      </View>
      <Text style={styles.text}>Loading...</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default LoadingScreen;
