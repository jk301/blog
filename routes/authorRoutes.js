import { Router } from 'express'
import {
    authorLogin, 
    getPosts, 
    postUnpub,
    deletePost, 
    editPost, 
    pushPub, 
    pullPub,
    deleteComment,
} from '../controllers/authorController.js'
import passport from 'passport'

export const authorRouter = Router()

authorRouter.post('/login', passport.authenticate('local', { session: false }), authorLogin)

// Protect jwt
authorRouter.get('/posts', passport.authenticate('jwt', { session: false }), getPosts)
authorRouter.post('/posts', passport.authenticate('jwt', { session: false }), postUnpub)
authorRouter.patch('/posts/:postId/publish', passport.authenticate('jwt', { session: false }), pushPub)
authorRouter.patch('/posts/:postId/unpublish', passport.authenticate('jwt', { session: false }), pullPub)
authorRouter.delete('/posts/:postId/delete', passport.authenticate('jwt', { session: false }), deletePost)
authorRouter.put('/posts/:postId/edit', passport.authenticate('jwt', { session: false }), editPost)
authorRouter.delete('/posts/:postId/comments/:commentId/delete', passport.authenticate('jwt', { session: false }), deleteComment)