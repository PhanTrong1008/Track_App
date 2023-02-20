import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import LoadingScreen from "./src/screens/LoadingScreen.js";
import AccountScreen from "./src/screens/AccountScreen.js";
import SignupScreen from "./src/screens/SignupScreen.js";
import SigninScreen from "./src/screens/SigninScreen.js";
import TrackCreateScreen from "./src/screens/TrackCreateScreen.js";
import TrackDetailScreen from "./src/screens/TrackDetailScreen.js";
import TrackListScreen from "./src/screens/TrackListScreen.js";
import { Provider as AuthProvider } from "./src/context/AuthContext.js";
import { Provider as LocationProvider } from "./src/context/LocationContext.js";
import { Provider as TrackProvider } from "./src/context/TrackContext.js";
import { setNavigator } from "./src/navigationRef.js";
import { FontAwesome } from '@expo/vector-icons';

const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen
});

trackListFlow.navigationOptions = {
  title: 'Tracks',
  tabBarIcon: <FontAwesome name="th-list" size={20}/>
}

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow,
    CreateTrack: TrackCreateScreen,
    Account: AccountScreen
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
