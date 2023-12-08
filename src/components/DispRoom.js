import { Text, View } from "react-native";
import styles from "../styles/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// display text dynamically
const DispText = ({ appliance_desc, time_left_lite }) => {
  return (
    <Text
      style={[
        styles.text,
        styles.litext,
        // if background is black, change text color to white:
        { color: time_left_lite == "Out of service" ? "#F7FFF7" : "#292F36" },
      ]}
    >
      {appliance_desc}: {time_left_lite}
    </Text>
  );
};

// display icon dynamically
const DispIcon = ({ time_left_lite, appliance_type }) => {
  return (
    <View style={styles.licon}>
      <MaterialCommunityIcons
        style={{
          // icons without the ! have different size, align machines left with 2px adjustment
          paddingLeft: time_left_lite == "Available" ? 2 : 0,
          paddingRight: time_left_lite == "Available" ? 0 : 2,
        }}
        name={
          // if washing machine:
          appliance_type == "W"
            ? // get corresponding icon to status
              time_left_lite == "Out of service"
              ? "washing-machine-off"
              : time_left_lite == "Available"
              ? "washing-machine-alert"
              : "washing-machine"
            : // else, dryer's corresponding icon:
            time_left_lite == "Out of service"
            ? "tumble-dryer-off"
            : time_left_lite == "Available"
            ? "tumble-dryer-alert"
            : "tumble-dryer"
        }
        size={20}
        color={
          // if black background for out of service, change icon color to white
          time_left_lite == "Out of service" ? "#F7FFF7" : "#292F36"
        }
      />
    </View>
  );
};

// display list item based on washer/dryer, availability
const DispRoom = ({
  col,
  item: {
    time_left_lite,
    appliance_desc,
    appliance_type,
    stacked,
    combo,
    time_left_lite2,
    appliance_desc2,
  },
}) => {
  // ensure that no washers in dryer col, vice versa if combo
  if (col == appliance_type) {
    return (
      <View>
        <View
          style={[
            styles.span,
            styles.li,
            // if available:
            time_left_lite == "Available"
              ? styles.available
              : // elif out of service:
              time_left_lite == "Out of service"
              ? styles.broken
              : // else, usually displaying messages like "x time remaining" or "Ext. Cycle":
                styles.busy,
          ]}
        >
          <DispText
            time_left_lite={time_left_lite}
            appliance_desc={appliance_desc}
          />
          <DispIcon
            time_left_lite={time_left_lite}
            appliance_type={appliance_type}
          />
        </View>

        {stacked ? (
          <View
            // if stacked, tack on a list item for the second machine:
            style={[
              styles.span,
              styles.li,
              time_left_lite2 == "Available"
                ? styles.available
                : time_left_lite2 == "Out of service"
                ? styles.broken
                : styles.busy,
            ]}
          >
            <DispText
              time_left_lite={time_left_lite2}
              appliance_desc={appliance_desc2}
            />
            <DispIcon
              time_left_lite={time_left_lite2}
              appliance_type={
                // stacked machines have same type
                appliance_type == "W" ? "W" : "D"
              }
            />
          </View>
        ) : null}
      </View>
    );
  } else if (combo) {
    // if combo (col and appliance type don't match, but there is a washer stacked with a dryer or vice versa):
    return (
      <View>
        <View
          style={[
            styles.span,
            styles.li,
            time_left_lite2 == "Available"
              ? styles.available
              : time_left_lite2 == "Out of service"
              ? styles.broken
              : styles.busy,
          ]}
        >
          <DispText
            time_left_lite={time_left_lite2}
            appliance_desc={appliance_desc2}
          />
          <DispIcon
            time_left_lite={time_left_lite2}
            appliance_type={
              // combo machines have opposite type
              appliance_type == "W" ? "D" : "W"
            }
          />
        </View>
      </View>
    );
  }
};

export default DispRoom;
