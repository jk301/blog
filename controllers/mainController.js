import { prisma } from '../lib/prisma.js'
import { passValid, genPass } from '../lib/utils.js'
import jwt from 'jsonwebtoken'

export function getMainPage (req, res) {
    res.json({
        message: "This is main route"
    })
}

export function getProfile (req, res) {
    res.json({
        message: 'Got the user through JWT', 
        user: req.user
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
    // issue a jwt
    const user = req.user
    const payload = { id: user.id, email: user.email, username: user.username }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

    return res.status(200).json({
        token
    })
}