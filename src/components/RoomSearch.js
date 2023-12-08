import axios from "axios";
import { Text, TextInput, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styles/styles";

// outdated search component to get data for a room, just left it as an example
const RoomSearch = () => {
  const [search, setSearch] = useState(null);
  // default values for Harvard Undergraduate Housing > Weld Hall, I think
  const [schoolKey, setSchoolKey] = useState(405);
  const [location, setLocation] = useState(1362588);

  // get data on schoolKey search change or page load
  useEffect(() => {
    getLaundryRooms();
    console.log(search);
  }, [schoolKey]);

  // query API, didn't realize that rdm was the current time
  const getLaundryRooms = async () => {
    await axios
      .get(
        `https://www.laundryview.com/api/currentRoomData?school_desc_key=${schoolKey}&location=${location}&rdm=1701045704597`
      )
      .then((response) => {
        setSearch(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  };

  return (
    search && (
      <View style={styles.innerContainer}>
        {/* old searchbar that would change the school id */}

        <TextInput
          style={styles.textInput}
          placeholder="Type something..."
          onSubmitEditing={(newSearch) =>
            setSchoolKey(newSearch.nativeEvent.text)
          }
        />

        {/* old list that displayed machine type and status */}

        <FlatList
          data={search.objects}
          keyExtractor={(item) => item.appliance_desc_key}
          renderItem={({ item }) => (
            <View style={styles.li}>
              <Text>
                {item.time_left_lite}, {item.appliance_desc_key}
              </Text>
            </View>
          )}
        />
      </View>
    )
  );
};

export default RoomSearch;
