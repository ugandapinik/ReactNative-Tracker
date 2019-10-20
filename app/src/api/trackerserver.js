import axios from 'axios';

// change the URL each time you restart ngrok
export default axios.create({
  baseURL: 'http://9941cf5a.ngrok.io'
});
