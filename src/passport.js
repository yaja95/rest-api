import Passport from 'passport'
import { OIDCStrategy } from 'passport-azure-ad'
import { AZURE_APP_ID, AZURE_APP_KEY } from './secrets'
import { User } from './database'
import { functions } from './database/data'

Passport.use(new OIDCStrategy({
  identityMetadata: 'https://login.microsoftonline.com/furman.onmicrosoft.com/.well-known/openid-configuration',
  clientID: AZURE_APP_ID,
  responseType: 'code',
  responseMode: 'form_post',
  redirectUrl: process.env.NODE_ENV === 'production'
    ? 'https://powerful-sands-17762.herokuapp.com/login/'
    : 'http://localhost:5000/login',
  allowHttpForRedirectUrl: true,
  clientSecret: AZURE_APP_KEY,
  passReqToCallback: false,
  scope: [] // add email access here
},
  function (iss, sub, profile, accessToken, refreshToken, done) {
    if (!profile.oid) {
      return done(new Error('No oid found'), null)
    }
    // asynchronous verification, for effect...
    process.nextTick(function () {
      User.findOrCreate({
        // HACK FIXME
        where: { oid: functions.uuid.fromString(profile.oid) },
        defaults: {
          oid: profile.oid,
          displayName: profile.displayName
        }
      }).then((user) => {
        return done(null, user)
      })
    })
  }
))

export const authenticate = (obj) =>
  Passport.authenticate('azuread-openidconnect', Object.assign({ failureRedirect: '/login' }, obj || {}))

export default Passport
