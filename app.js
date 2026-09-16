import express from "express"
import { configDotenv } from "dotenv"

import { mainRouter } from './routes/mainRoutes.js'
import { authorRouter } from './routes/authorRoutes.js'

configDotenv()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/main', mainRouter)
app.use('/author', authorRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, (err) => {
    console.log(`Running on ${PORT}`)
    if (err) throw err
})