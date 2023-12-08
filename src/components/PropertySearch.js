import axios from "axios";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styles/styles";

// search for properties in LaundryView for homescreen display
const PropertySearch = ({ navigation: { navigate }, search }) => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState(null);
  const [dispProperties, setDispProperties] = useState(null);

  // query API for locations asynchronously
  const getProperties = async () => {
    await axios
      .get("https://www.laundryview.com/api/c_locations")
      .then((response) => {
        // set properties variable to JSON data
        setProperties(response.data);
      })
      .catch((error) => {
        // log any errors
        console.log("Error fetching data: ", error);
      });
  };

  // query API when page loads, then stop loading (starts by default true)
  useEffect(() => {
    getProperties();
    setLoading(false);
  }, []);

  // when user changes search or properties are loaded:
  useEffect(() => {
    if (search && properties) {
      // filter properties
      setDispProperties(
        properties.filter((item) =>
          // replace symbols and whitespace and lower to match search
          item.school_name
            .replace(/[\s.!@#$%^&*(),/:;'"{}|\-_=+]/g, "")
            .toLowerCase()
            .includes(search)
        )
      );
    } else {
      // if no search to filter properties with yet, set to all properties
      setDispProperties(properties);
    }
  }, [search, properties]);

  // if page loading, display message
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  // if search and dispProperties properly loaded:
  return (
    search &&
    dispProperties && (
      <View style={[styles.list, styles.container]}>
        {/* list of matches to search, empty if no search */}
        <FlatList
          data={dispProperties}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.school_desc_key}
          renderItem={({ item }) => (
            <View style={styles.container}>
              {/* use touchableOpacity to have opacity effect when pressed, change screens when pressed with navigation */}

              <TouchableOpacity
                style={styles.li}
                onPress={() => {
                  navigate("PropertyScreen", {
                    school_desc_key: item.school_desc_key,
                  });
                }}
              >
                {/* display matching property names */}

                <Text style={styles.text}>{item.school_name}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    )
  );
};

export default PropertySearch;
