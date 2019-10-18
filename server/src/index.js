// Models (must be required before it is used, e.g. before authRoutes)
require('./models/User');
require('./models/Track');

// import bodyParser
const bodyParser = require('body-parser');

// import router
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');

// authentication
const requireAuth = require('./middlewares/requireAuth');

// create an express instance
const express = require('express');
const app = express();
// have Express use bodyparser
app.use(bodyParser.json());

// have Express use the router
app.use(authRoutes);
app.use(trackRoutes);

// create a mongo/mongoose instance
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://admin:passwordpassword@react-native-tracker-yxtkc.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongo');
});

mongoose.connection.on('error', (err) => {
  console.log('Error!', err);
});

// routing with authentication
app.get('/', requireAuth, (req, res) => {
  res.send(`your email is : ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('listening on 3000')
});
