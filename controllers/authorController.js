import { prisma } from '../lib/prisma.js'
import jwt from 'jsonwebtoken'

export async function authorLogin (req, res) {
    // issue a jwt
    const user = req.user
    try {
        const newUser = await prisma.user.update({
            data: {
                isAuthor: true
            }, where : {
                id : user.id
            }
        })

        const payload = { 
            id: newUser.id, 
            email: newUser.email, 
            username: newUser.username, 
            isAuthor: newUser.isAuthor 
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

        return res.status(200).json({
            token
        })
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong." })
    }
}

export async function postUnpub (req, res) {
    const userId = req.user.id
    const title = req.body.title
    const content = req.body.content

    if (!req.user.isAuthor) {
        return res.status(403).json({ error: "Only authors can create posts." })
    }

    if (!title || !content || !userId) {
        return res.status(400).json({ error: "content or identifiers is missing." })
    }
    
    try {
        await prisma.post.create({ data: { title, content, userId }})
        res.status(201).json({ message: "A unpublished post added." })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Something went wrong." })
    }
}