import React, { useContext } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';

const TrackListScreen = ({ navigation }) => {
  const { tracks, fetchTracks } = useContext(TrackContext);

  if (!tracks) {
    return (
      <Text h3 style={styles.text}>No tracks yet recorded</Text>
    );
  }

  return (
    <>
      <NavigationEvents onWillFocus={fetchTracks} />
      <FlatList
        data={tracks}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                // can use navigation.navigate because component is rendered
                // inside the switch navigator
                navigation.navigate('TrackDetail', { _id: item._id })
              }
            >
              <ListItem chevron title={item.name} />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

TrackListScreen.navigationOptions = {
  title: 'Tracks',
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginTop: 250
  }
});

export default TrackListScreen;
