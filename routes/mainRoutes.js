import { Router } from 'express'
import {
    getMainPage, 
    getProtected, 
    register, 
    login
} from '../controllers/mainController.js'
import passport from 'passport'

export const mainRouter = Router()

mainRouter.get('/', getMainPage)
mainRouter.get('/protect', getProtected)

mainRouter.post('/register', register)
mainRouter.post('/login', passport.authenticate('local', { session: false }), login)