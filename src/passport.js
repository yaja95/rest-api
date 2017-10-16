import Passport from 'passport'
import { OIDCStrategy } from 'passport-azure-ad'
import { AZURE_APP_ID, AZURE_APP_KEY } from './secrets'

Passport.use(new OIDCStrategy({
  identityMetadata: 'https://login.microsoftonline.com/furman.onmicrosoft.com/.well-known/openid-configuration',
  clientID: AZURE_APP_ID,
  responseType: 'code',
  responseMode: 'form_post',
  redirectUrl: 'http://localhost:5000/auth/openid/return',
  allowHttpForRedirectUrl: true,
  clientSecret: AZURE_APP_KEY,
  passReqToCallback: false,
  scope: [] // add email access here
},
  function (iss, sub, profile, accessToken, refreshToken, done) {
    if (!profile.oid) {
      return done(new Error('No oid found'), null)
    }
    done(null, profile)
    // asynchronous verification, for effect...
    // process.nextTick(function () {
    //   findByOid(profile.oid, function (err, user) {
    //     if (err) {
    //       return done(err)
    //     }
    //     if (!user) {
    //       // "Auto-registration"
    //       users.push(profile)
    //       return done(null, profile)
    //     }
    //     return done(null, user)
    //   })
    // })
  }
))

export default Passport
