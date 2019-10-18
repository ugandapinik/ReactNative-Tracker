const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

// before safe, hash and salt password
// no arrow function since we use 'this' in the body of the function
userSchema.pre('save', function (next) {
  const user = this;

  // if user has not modified their password, skip
  if (!user.isModified('password')) {
    return next();
  }

  // salting
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    // hashing
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      // next = save the user to the db in that case
      next();
    })
  });
});


// method to retrieve a user with an hash and salted password token
userSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;

  // using a promise because the lib does not handle async await
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

mongoose.model('User', userSchema);
