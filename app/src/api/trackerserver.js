import axios from 'axios';

// change the URL each time you restart ngrok
export default axios.create({
  baseURL: 'http://58a7ce16.ngrok.io'
});
