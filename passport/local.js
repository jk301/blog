import { prisma } from '../lib/prisma.js'
import passport from "passport"
import { Strategy as LocalStrategy } from 'passport-local'
import { passValid } from '../lib/utils.js'

passport.use(new LocalStrategy({ usernameField: 'email'}, 
  async (email, password, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { email: email }})
        if (!user) return done(null, false, { message: "User email doesn't exist." })
        
        const valid = await passValid(password, user.hash)
        if (!valid) return done(null, false, { message: "Password is incorrect." })

        return done(null, user)
        
    } catch (error) {
        return done(error)
    }
  }
))