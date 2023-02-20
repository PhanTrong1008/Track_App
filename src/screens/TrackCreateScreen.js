import React, { useContext, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Map from "../components/Map.js";
import { withNavigationFocus, SafeAreaView } from "react-navigation";
import { Context as LocationContext } from "../context/LocationContext.js";
import useLocation from "../hooks/useLocation.js";
import TrackForm from "../components/TrackForm.js";
import { FontAwesome } from '@expo/vector-icons';
import "../_mockLocation";

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation
  } = useContext(LocationContext);
  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );
  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Create a Track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: 'Add Track',
  tabBarIcon: <FontAwesome name="plus" size={20}/>
}

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
