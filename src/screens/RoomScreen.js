import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import React from "react";
import styles from "../styles/styles";
import RoomInfo from "../components/RoomInfo";

// display info about the room by passing down school key, laundry room key, and laundry room name into RoomInfo
const PropertyScreen = ({ route }) => {
  const { laundry_room_location, school_desc_key, laundry_room_name } =
    route.params;
  return (
    <SafeAreaView style={styles.container}>
      <RoomInfo
        laundry_room_location={laundry_room_location}
        school_desc_key={school_desc_key}
        laundry_room_name={laundry_room_name}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default PropertyScreen;
