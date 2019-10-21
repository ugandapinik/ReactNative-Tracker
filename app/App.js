import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

// will be used to pass the navigator to the reducers
// since reducers are outside of the react components
import { setNavigator } from "./src/navigationRef";

// importing different context providers
import { Provider as AuthProvider } from "./src/context/AutContext";
import { Provider as LocationProvider } from "./src/context/LocationContext"
import { Provider as TrackProvider } from "./src/context/TrackContext"

const switchNavigator = createSwitchNavigator({
  // first check if user logged-in by checking token
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow: createStackNavigator({
      TrackList: TrackListScreen,
      TrackDetail: TrackDetailScreen
    }),
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen
  })
},
  {
    initialRouteName: 'ResolveAuth',
    defaultNavigationOptions: {
      title: 'React Native Tracker'
    }
  });


const App = createAppContainer(switchNavigator);

export default () => {
  return(
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App
            // passing the navigator to make accessible in the reducers
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
