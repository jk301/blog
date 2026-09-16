import { prisma } from '../lib/prisma.js'

export function getAuthorPage (req, res) {
    res.json({
        message: "This is Author page"
    })
}

export function getAuthorProtect (req, res) {
    res.json({
        message: 'got through the protected route (author)'
    })
}