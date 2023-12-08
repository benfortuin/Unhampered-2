import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // machine color states, generated with https://coolors.co/292f36-4ecdc4-f7fff7-ff6b6b
  available: {
    backgroundColor: "#4ECDC4",
  },
  broken: {
    backgroundColor: "#292F36",
  },
  busy: {
    backgroundColor: "#FF6B6B",
  },

  // container styles for screen layouts
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    backgroundColor: "#F7FFF7",
  },

  // list styling
  li: {
    backgroundColor: "#4ECDC4",
    padding: 5,
    marginBottom: 2,
    borderRadius: 5,
  },
  licon: {},
  heading_1: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Futura",
  },
  list: {
    width: "95%",
    alignContent: "left",
  },
  litext: {
    flex: 1,
    fontSize: 12,
    textAlign: "left",
  },

  // style tag to put components next to each other
  span: {
    flexDirection: "row",
    alignItems: "center",
  },

  // title styling
  title: {
    paddingBottom: 10,
    borderColor: "#FF6B6B",
    borderWidth: 5,
    paddingLeft: 15,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
    width: "90%",
  },
  title_text: {
    color: "#FF6B6B",
    fontSize: 40,
  },

  // font
  text: {
    fontFamily: "Futura",
  },

  // input box styling
  textInput: {
    height: 40,
    borderColor: "#292F36",
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 10,
    padding: 8,
    marginTop: 10,
    width: "90%",
    textAlign: "center",
  },
});

export default styles;
