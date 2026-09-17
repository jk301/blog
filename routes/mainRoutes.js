import { Router } from 'express'
import {
    getMainPage, 
    getProfile, 
    register, 
    login, 
    getAllPosts
} from '../controllers/mainController.js'
import passport from 'passport'

export const mainRouter = Router()

mainRouter.post('/register', register)
mainRouter.get('/posts', getAllPosts)

// Protect 
mainRouter.get('/profile', passport.authenticate('jwt', { session: false }), getProfile)
mainRouter.post('/login', passport.authenticate('local', { session: false }), login)
