import { Router } from 'express'
import {
    authorLogin, 
    postUnpub
} from '../controllers/authorController.js'
import passport from 'passport'

export const authorRouter = Router()

authorRouter.post('/login', passport.authenticate('local', { session: false }), authorLogin)

// Protect jwt
authorRouter.post('/posts', passport.authenticate('jwt', { session: false }), postUnpub)
