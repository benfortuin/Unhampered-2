import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import styles from "../styles/styles";
import PropertySearch from "../components/PropertySearch";
import { MaterialIcons } from "@expo/vector-icons"; // using icons provided by Expo

// homescreen with title, searchbar, and property list
const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState(null);

  // use SafeAreaView to constrain to nondisruptive parts of the screen, iOS specific
  return (
    <SafeAreaView style={styles.innerContainer}>
      <View style={[styles.title, styles.span]}>
        {/* title: */}

        <MaterialIcons name="local-laundry-service" size={50} color="black" />
        <Text style={[styles.text, styles.title_text]}>Unhampered</Text>
      </View>

      {/* searchbar: replace symbols and whitespace, lower, then store in search */}

      <TextInput
        autoCorrect={false}
        spellCheck={false}
        style={[styles.text, styles.textInput]}
        placeholder="Search for a location..."
        onChangeText={(newSearch) => setSearch(newSearch.replace(/[\s.!@#$%^&*(),/:;'"{}|\-_=+]/g, '').toLowerCase())}
      />

      {/* pass search into child component for displaying corresponding properties */}

      <PropertySearch navigation={navigation} search={search} />

      {/* devtool from Expo: */}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default HomeScreen;
