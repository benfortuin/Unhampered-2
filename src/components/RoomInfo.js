import axios from "axios";
import { Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styles/styles";
import DispRoom from "../components/DispRoom";

const RoomInfo = ({
  school_desc_key,
  laundry_room_location,
  laundry_room_name,
}) => {
  // info stores API query, sort vars sort into washers + combo and dryers + combos
  const [info, setInfo] = useState(null);
  const [sortW, setSortW] = useState([]);
  const [sortD, setSortD] = useState([]);

  // query API on page load
  useEffect(() => {
    getInfo();
  }, []);

  // sort info each time it changes
  useEffect(() => {
    setSortW(getW(info));
    setSortD(getD(info));
  }, [info]);

  // sort washers:
  const getW = () => {
    // if info and info.objects have been loaded (js promise fulfilled):
    return (
      info &&
      info.objects
        // filter by appliance type "W" or if combo machine, removing desc_key nulls (usually card reader)
        .filter(
          (item) =>
            item.appliance_desc_key !== undefined &&
            (item.appliance_type == "W" || item.combo)
        )
        // sort with string comparison of appliance desc (letter-number combo on the machine)
        .sort((a, b) => a.appliance_desc.localeCompare(b.appliance_desc))
    );
  };

  // sort dryers:
  const getD = () => {
    // if info and info.objects have been loaded (js promise fulfilled):
    return (
      info &&
      info.objects
        // filter by appliance type "D" or if combo machine, removing desc_key nulls (usually card reader)
        .filter(
          (item) =>
            item.appliance_desc_key !== undefined &&
            (item.appliance_type == "D" || item.combo)
        )
        // sort with string comparison of appliance desc (letter-number combo on the machine)
        .sort((a, b) => a.appliance_desc.localeCompare(b.appliance_desc))
    );
  };

  // query API
  const getInfo = async () => {
    //
    await axios
      // use axios to async query API, inserting school key and laundry room location into URL from prev components and 9-digit current time
      .get(
        `https://www.laundryview.com/api/currentRoomData?school_desc_key=${school_desc_key}&location=${laundry_room_location}&rdm=${Date.now()
          .toString()
          .substring(0, 9)}`
      )
      .then((response) => {
        // for debugging - pasting link to console to open API in separate windows
        console.log(
          `https://www.laundryview.com/api/currentRoomData?school_desc_key=${school_desc_key}&location=${laundry_room_location}&rdm=${Date.now()
            .toString()
            .substring(0, 9)}`
        );

        // set info to query data
        setInfo(response.data);
      })
      // if query fails, log error
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  };

  // check for info and sortW loading, then:
  // keyExtractor uses unique desc_key's provided by API
  // renderItem uses DispRoom.js file to render each li

  if ((sortW == [] || sortW == null) && (sortD == [] || sortD == null)) {
    return (
      <View style={styles.innerContainer}>
        <Text style={[styles.text, styles.heading_1]}>{laundry_room_name}</Text>
        <Text style={styles.text}>No Data :(</Text>
      </View>
    );
  }
  return (
    <View style={styles.innerContainer}>
      <Text style={styles.heading_1}>{laundry_room_name}</Text>
      <View style={[styles.span, styles.list]}>
        <View style={styles.container}>
          {/* Washing Machine list: */}

          <Text style={styles.heading_1}>Washers</Text>
          {info && sortW && (
            <FlatList
              style={styles.list}
              data={sortW}
              keyExtractor={(item) => item.appliance_desc_key}
              renderItem={({ item }) => <DispRoom item={item} col={"W"} />}
            ></FlatList>
          )}
        </View>
        <View style={styles.container}>
          {/* Dryer list: */}

          <Text style={styles.heading_1}>Dryers</Text>
          {info && info.objects && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={sortD}
              keyExtractor={(item) => item.appliance_desc_key}
              renderItem={({ item }) => <DispRoom item={item} col={"D"} />}
            ></FlatList>
          )}
        </View>
      </View>
    </View>
  );
};

export default RoomInfo;
