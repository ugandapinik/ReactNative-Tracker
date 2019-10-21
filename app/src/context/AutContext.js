import { AsyncStorage } from 'react-native';
import createDataContext from "./createDataContext";
import trackerAPI from "../api/trackerserver";

// using navigate to access the navigator and redirect the user
import { navigate } from '../navigationRef';


// AUTHENTICATION REDUCERS
const authReducer = (state, action) => {
  switch (action.type) {

    case 'add_error': {
      return {
        ...state,
        errorMessage: action.payload
      };
    }

    case 'clear_error_message': {
      return {
        ...state,
        errorMessage: ''
      };
    }
    case 'signin': {
      return {
        errorMessage: '',
        token: action.payload
      };
    }

    default:
      return state;
  }
};


// CLEARING ERROR MESSAGES WHEN SWITCHING SIGNIN-SIGNUP
const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};


// AUTOMATIC SIGNIN
const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });

    navigate('TrackList');
  } else {
    navigate('Signup');
  }
};

// SIGNUP
const signup = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerAPI.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signin', payload: response.data.token });

    // making use of the navigate component to access navigation
    // and redirect the user
    navigate('TrackList');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up'
    });
  }
};


// SIGNIN
const signin = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerAPI.post('/signin', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    // using signin since the logic is the same
    dispatch({ type: 'signin', payload: response.data.token });

    // making use of the navigate component to access navigation
    // and redirect the user
    navigate('TrackList');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in'
    });
  }
};


// SIGNOUT
const signout = dispatch => async () => {
  // removing the token makes identification not work again
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });

  navigate('loginFlow');
};


// CREATING CONTEXT AND PROVIDER OBJECTS FOR AUTHENTICATION
export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signup,
    signout,
    clearErrorMessage,
    tryLocalSignin
  },
  {
    token: null,
    errorMessage: ''
  }
);
