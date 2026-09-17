import { Router } from 'express'
import {
    getProfile, 
    register, 
    login, 
    getAllPosts, 
    postComment
} from '../controllers/mainController.js'
import passport from 'passport'

export const mainRouter = Router()

mainRouter.post('/register', register)
mainRouter.get('/posts', getAllPosts)

mainRouter.post('/login', passport.authenticate('local', { session: false }), login)

// Protect jwt
mainRouter.post('/posts/:postId/comments', passport.authenticate('jwt', { session: false }), postComment)
