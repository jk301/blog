import { Router } from 'express'
import {
    getMainPage, 
    getProtected, 
    register
} from '../controllers/mainController.js'

export const mainRouter = Router()

mainRouter.get('/', getMainPage)
mainRouter.get('/protect', getProtected)
mainRouter.post('/register', register)