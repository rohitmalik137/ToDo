// const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config/default.json');
const User = require('../models/user');

exports.signup = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  User.findOne({ email })
    .then((user) => {
      if (user) throw Error('User already exists');
      bcrypt.hash(password, 12).then((hashedPwd) => {
        const user = new User({
          email: email,
          password: hashedPwd,
        });
        user
          .save()
          .then((result) => {
            const token = jwt.sign(
              {
                email: result.email,
                userId: result._id,
              },
              config.jwtSecret,
              { expiresIn: '1h' }
            );
            res
              .status(201)
              .json({ token: token, userId: result._id.toString() });
          })
          .catch((err) => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
      });
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        config.jwtSecret,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

exports.userData = (req, res, next) => {
  // console.log(req.user);
  User.findById(req.user.userId)
    .select('-password')
    .then((user) => res.json(user));
};
