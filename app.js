import express from "express"
import { configDotenv } from "dotenv"

configDotenv()
const app = express()

// for using client
// import { prisma } from 'lib/prisma.js'

app.get('/api', (req, res) => {
    res.json({
        bruh: "momento"
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, (err) => {
    console.log(`Running on ${PORT}`)
    if (err) throw err
})