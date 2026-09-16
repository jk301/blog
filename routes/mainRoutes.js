import { Router } from 'express'
import {
    getMainPage, 
    getProfile, 
    register, 
    login
} from '../controllers/mainController.js'
import passport from 'passport'

export const mainRouter = Router()

mainRouter.get('/', getMainPage)

// Protect 
mainRouter.get('/profile', passport.authenticate('jwt', { session: false }), getProfile)

mainRouter.post('/register', register)
mainRouter.post('/login', passport.authenticate('local', { session: false }), login)