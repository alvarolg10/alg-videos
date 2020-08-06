const axios = require('axios');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');

const config = require('../config');

const facebookOptions = {
  clientID: config.facebookClientId,
  clientSecret: config.facebookClientSecret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'email', 'first_name', 'last_name']
};

passport.use(
  new FacebookStrategy(
    facebookOptions,
    async (accessToken, refreshToken, profile, done) => {
      const { email, first_name, last_name } = profile._json;
      if (!email) {
        return done({ error: 'Error verifying facebook token' });
      }
      try {
        const { data } = await axios.post(
          'http://localhost:5000/api/auth/signin-provider',
          {
            name: first_name + '' + last_name,
            email
          },
          {
            withCredentials: true
          }
        );
        if (!data) {
          done({ error: 'Error at signing in with Facebook' });
        }
        done(null, data);
      } catch (e) {
        done({ error: e.message });
      }
    }
  )
);
