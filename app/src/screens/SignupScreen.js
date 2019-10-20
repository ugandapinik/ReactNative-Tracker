import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from "../components/Spacer";

import { Context as AuthContext } from "../context/AutContext";

const SignupScreen = ({ navigation }) => {
  const { state, signup } = useContext(AuthContext);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  return(
    <View style={styles.container}>
      <Spacer>
        <Text h3>Sign Up for RN Tracker</Text>
      </Spacer>

      <Input
        autoCapitalize={'none'}
        autoCorrect={false}
        label={'Email'}
        value={email}
        onChangeText={setEmail}
      />
      <Spacer />
      <Input
        autoCapitalize={'none'}
        autoCorrect={false}
        secureTextEntry
        label={'Password'}
        value={password}
        onChangeText={setPassword}
      />

      {state.errorMessage ?
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
        : null
      }
      <Spacer>
        <Button
          title={'Sign Up'}
          onPress={() => signup({ email, password })}
        />
      </Spacer>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signin')}
      >
        <Spacer>
          <Text style={styles.link}>Already have an account? Sign in.</Text>
        </Spacer>
      </TouchableOpacity>
    </View>);
};

SignupScreen.navigationOptions = () => {
  return {
    header: null
  };
};

const styles = StyleSheet.create({
  link: {
    color: 'blue'
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250
  }
});

export default SignupScreen;
