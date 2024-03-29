const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.auth = function(req, res) {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(422).send({errors: [{title: 'Data missing', detail: 'Provide email and password'}]});
  }

  User.findOne({email}, function(err, user) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if(!user) {
      return res.status(422).send({errors: [{title: 'Invalid User', detail: 'User does not exists'}]});
    }

    if (user.hasSamePassword(password)) {

      const token = jwt.sign({
        userId: user.id,
        username: user.username
      }, config.SECRET, { expiresIn: '1h' });

      return res.json(token);

    } else {
      return res.status(422).send({errors: [{title: 'Invalid Credentials', detail: 'Wrong email or password'}]});
    }
  })
}

exports.register = function(req, res) {
  const { username, email, password, confirmPassword } = req.body;

  if (!password || !email) {
    return res.status(422).send({errors: [{title: 'Data missing', detail: 'Provide email and password'}]});
  }

  if (password !== confirmPassword) {
    return res.status(422).send({errors: [{title: 'Invalid Password!', detail: 'Password do not match'}]});
  }

  User.findOne({email}, function(err, existingUser) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (existingUser) {
      return res.status(422).send({errors: [{title: 'Invalid Email', detail: 'User already exists'}]});
    }

    const user = new User({
      username,
      email,
      password
    });

    user.save(function(err) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      res.json({'registered': true});
    })
  })
}

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;

  if(token) {
    const user = parseToken(token);

    User.findById(user.userId, function(err, user) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorised(res);
      }
    })
  } else {
    return notAuthorised(res);
  }
}

function parseToken(token) {

  return jwt.verify(token.split(' ')[1], config.SECRET)
}

function notAuthorised(res) {
  return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'You need to login to get access'}]});
}
