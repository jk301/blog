import { Router } from 'express'

import {
    getAuthorPage, 
    getAuthorProtect
} from '../controllers/authorController.js'

export const authorRouter = Router()

authorRouter.get('/', getAuthorPage)
authorRouter.get('/protect', getAuthorProtect)