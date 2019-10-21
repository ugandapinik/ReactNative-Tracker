import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const TrackListScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>TrackListScreen</Text>
      <Button
        title={'Go to Track Detail'}
        // can use navigation.navigate because component is rendered
        // inside the switch navigator
        onPress={() => navigation.navigate('TrackDetail')}
      />
    </>
  );
};

TrackListScreen.navigationOptions = {
  title: 'Tracks'
};

const styles = StyleSheet.create({

});

export default TrackListScreen;
