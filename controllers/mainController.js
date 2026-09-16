import { prisma } from '../lib/prisma.js'
import { passvalid, genPass } from '../lib/utils.js'

export function getMainPage (req, res) {
    res.json({
        message: "This is main route"
    })
}

export function getProtected (req, res) {
    res.json({
        message: 'got through the protected route'
    })
}

export async function register (req, res) {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password

    if (!email || !username || !password) {
        return res.status(400).json({
            error: 'All input fields must me filled'
        })
    }

    try {
        const hashed = await genPass(password)

        await prisma.user.create({
            data: { email, username, hash: hashed }
        })

        return res.status(201).json({ message: 'User created' })
        
    } catch (err) {
        if (err.code === 'P2002') {
            return res.status(409).json({ error: 'Email is already taken.' })
        }
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

export function login (req, res) {
    const email = req.body.email
    const pass = req.body.password

    // validate & issue a token here 
}