import React from "react";
import SchoolSearch from "../components/SchoolSearch";

// receives school key from property search and passes it into SchoolSearch
const PropertyScreen = ({ route, navigation }) => {
  const { school_desc_key } = route.params;
  return (
    <SchoolSearch school_desc_key={school_desc_key} navigation={navigation}/>
  );
};

export default PropertyScreen;
