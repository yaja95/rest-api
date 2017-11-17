import Passport from 'passport'
import { OIDCStrategy } from 'passport-azure-ad'
import { AZURE_APP_ID, AZURE_APP_KEY } from './secrets'
import { User } from './database'
import UUID from './types/UUID'

Passport.use(new OIDCStrategy({
  identityMetadata: 'https://login.microsoftonline.com/furman.onmicrosoft.com/.well-known/openid-configuration',
  clientID: AZURE_APP_ID,
  responseType: 'code',
  responseMode: 'form_post',
  redirectUrl: process.env.NODE_ENV === 'production'
    ? 'https://powerful-sands-17762.herokuapp.com/login/azure/return'
    : 'http://localhost:5000/login/azure/return',
  allowHttpForRedirectUrl: true,
  clientSecret: AZURE_APP_KEY,
  passReqToCallback: false,
  scope: [] // add email access here
},
  async function (profile, done) {
    if (!profile.oid) {
      done(new Error('No oid found'), null)
    }
    const [ user ] = await User.findOrCreate({
      // HACK FIXME
      where: { oid: new UUID(profile.oid) },
      defaults: {
        oid: profile.oid,
        displayName: profile.displayName
      }
    })
    return done(null, user.get())
  }
))

Passport.serializeUser((user, done) => done(null, user.oid.toString()))
Passport.deserializeUser(async (oid, done) => {
  if (!oid) return done(null, null)
  console.log(oid)
  const user = await User.findById(new UUID(oid))
  if (user) {
    return done(null, user.get())
  } else {
    return done(new Error('User deserialization failed', null))
  }
})

export const authenticate = () => Passport.authenticate('azuread-openidconnect', { failureRedirect: '/login' })

export default Passport
