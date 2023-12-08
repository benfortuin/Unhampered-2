import React, { useState, useEffect } from "react";
import HomeScreen from "./src/screens/HomeScreen";
import ErrorScreen from "./src/screens/ErrorScreen"; // old screen for errors
import LoadingScreen from "./src/screens/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PropertyScreen from "./src/screens/PropertyScreen";
import RoomScreen from "./src/screens/RoomScreen";

const Stack = createNativeStackNavigator();

// unfinished try to implement page storage with async-storage in device memory to reopen on last opened page:

// untested try to store screen location
const storeScreen = async (screen) => {
  try {
    await AsyncStorage.setItem("screen", screen);
  } catch (error) {
    console.error("Error storing screen:", error);
  }
};

// untested try to retreive last screen location
const getScreen = async () => {
  try {
    const screen = await AsyncStorage.getItem("screen");
    if (screen !== null) {
      return screen;
    }
  } catch (error) {
    console.error("Error getting screen: ", error);
  }
};

// main app file!
export default function App() {
  // use loading
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(null);

  // get screen location (defaults to homescreen because of unfinished implementation)
  useEffect(() => {
    const fetchData = async () => {
      const retrievedScreen = await getScreen();
      setScreen(retrievedScreen);
      setLoading(false);
    };

    fetchData();
  }, []);

  // ensure no error from trying to load page before screen retrieved
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {/* Using react navigation: */}
      <Stack.Navigator
        initialRouteName={screen}
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* declare screens: */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PropertyScreen" component={PropertyScreen} />
        <Stack.Screen name="RoomScreen" component={RoomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
