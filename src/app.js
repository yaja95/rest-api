import 'babel-polyfill'
import '../scripts/env'

import Restify from 'restify'
import Sessions from 'client-sessions'
import Passport from 'passport'
import { OIDCStrategy } from 'passport-azure-ad'
import * as Database from './database'
import * as Paths from './paths'
import { SESSION_SECRET, AZURE_APP_ID, AZURE_APP_KEY, COOKIE_ENCRYPTION_KEY, COOKIE_ENCRYPTION_IV } from './secrets'

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
  // useCookieInsteadOfSession: true,
  // cookieEncryptionKeys: [
  //   { key: COOKIE_ENCRYPTION_KEY, iv: COOKIE_ENCRYPTION_IV }
  // ]
},
  function (iss, sub, profile, accessToken, refreshToken, done) {
    if (!profile.oid) {
      return done(new Error('No oid found'), null)
    }
    console.log(iss)
    console.log(sub)
    console.log(profile)
    console.log(accessToken)
    console.log(refreshToken)
    done(null, profile.oid)
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

const server = Restify.createServer({
  name: ''
})

server.pre([
  Restify.plugins.pre.userAgentConnection(),
  Restify.plugins.pre.sanitizePath()
])

server.use([
  Restify.plugins.acceptParser(server.acceptable),
  Restify.plugins.queryParser(),
  Restify.plugins.bodyParser({ rejectUnknown: true }),
  Restify.plugins.fullResponse(),
  Passport.initialize(),
  Passport.session()
])

server.use(Sessions({
  requestKey: 'session',
  secret: SESSION_SECRET
}))

server.use(function cors (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

Paths.gets.forEach(({ path, handler }) => server.get(path, handler))
Paths.posts.forEach(({ path, handler }) => server.post(path, handler))
Paths.puts.forEach(({ path, handler }) => server.put(path, handler))
Paths.patches.forEach(({ path, handler }) => server.patch(path, handler))
Paths.deletes.forEach(({ path, handler }) => server.del(path, handler))

// GET /auth/openid
//   Use Passport.authenticate() as route middleware to authenticate the
//   request. The first step in OpenID authentication involves redirecting
//   the user to their OpenID provider. After authenticating, the OpenID
//   provider redirects the user back to this application at
//   /auth/openid/return.
server.get('/auth/openid',
  Passport.authenticate('azuread-openidconnect', { failureRedirect: '/login' }),
  function (req, res) {
    console.log('Authentication was called in the Sample')
    res.redirect('/')
  }
)

// GET /auth/openid/return
//   Use Passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user is redirected back to the
//   sign-in page. Otherwise, the primary route function is called,
//   which, in this example, redirects the user to the home page.
server.get('/auth/openid/return',
  Passport.authenticate('azuread-openidconnect', { failureRedirect: '/login' }),
  function (req, res) {
    console.log('We received a return from AzureAD.')
    res.redirect('/')
  }
)

export async function start () {
  try {
    await Database.init()
  } catch (err) {
    throw err
  }
  return new Promise(resolve => {
    server.listen(process.env.PORT || 5000, () => resolve(server.url))
  })
}

if (process.env.RUN) {
  start()
    .then(url => console.log(`listening at ${url}`))
    .catch(err => {
      console.error(`Error during startup: ${err}`)
      process.abort()
    })
}

export function stop () {
  server.close()
  Database.close()
}
