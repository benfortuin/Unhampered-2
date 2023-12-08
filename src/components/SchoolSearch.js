import axios from "axios";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styles/styles";

// list rooms from a certain property loc
const SchoolSearch = ({ school_desc_key, navigation: { navigate } }) => {
  const [search, setSearch] = useState(null);

  // query API on load
  useEffect(() => {
    getSchool();
  }, []);

  // query API with dynamic insertion of property ID into URL
  const getSchool = async () => {
    await axios
      .get(
        `https://www.laundryview.com/api/c_room?cui=1&loc=${school_desc_key}`
      )
      .then((response) => {
        setSearch(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  };

  // once search loaded:
  return (
    search && (
      <SafeAreaView style={styles.container}>
        {/* Title - property name: */}

        <Text style={styles.heading_1}>{search.school_name}</Text>
        <View style={styles.innerContainer}>
          {/* list of rooms in the property: */}

          <FlatList
            showsVerticalScrollIndicator={false}
            data={search.room_data}
            keyExtractor={(item) => item.laundry_room_location}
            renderItem={({ item }) => (
              <View style={styles.li}>
                {/* Pass room id and name to new screen when pressed */}

                <TouchableOpacity
                  onPress={() =>
                    navigate("RoomScreen", {
                      school_desc_key: school_desc_key,
                      laundry_room_location: item.laundry_room_location,
                      laundry_room_name: item.laundry_room_name,
                    })
                  }
                >
                  <Text style={styles.text}>{item.laundry_room_name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    )
  );
};

export default SchoolSearch;
