# react-native-tracker
React Native Geoloc Tracking app (test)

Location tracking app à la Strava (cheap version) in React Native with an Express/Node server based on [Stephen Grider's course on Udemy](https://www.udemy.com/course/the-complete-react-native-and-redux-course/)

More info on the dependencies and tools:

***SERVER***

- Node with Express
- Mongo/Mongoose for the db (Atlas)
- Nodemon for hot reload
- json web token for identifier of user account
- bcrypt for hashing and salting of password
- body parser for req body parsing in Express


***React native app***

- React Native with Expo (hooks with use of Context instead of Redux)
- Expo location and react-native-maps for location tracking and display (Accuracy, requestPermissionsAsync and watchPositionAsync)
- Axios for call to the node server
- Use of Ngrok in order to get a forward URL since I am testing on a physical device (Android) with Expo
- Use of NavigationEvents for easier navigation and fetch between screens instead of tracking booleans or 'didFocus'
- The following deps are used for navigation:
* react-navigation
* react-native-gesture-handler
* react-native-reanimated
* react-nativigation-stack
* react-navigation-tabs
- creation of a custom navigation element in order to access it in the reducers
- Use of AsyncStorage to set/get user's token
- Use of react-native-elements and FontAwesome for styling
- use a _mocklocation file in order to simulate a user's path without having to walk around the block (test purposes)

Feel freet to comment, PR, clone etc... in order to help me be a better noob :)
