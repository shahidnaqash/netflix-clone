import type { NextApiRequest, NextApiResponse } from 'next'
import prismaClient from '@/lib/prisma'
import bcrypt from "bcrypt";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') return res.status(400).end('')
    try {
        const { username, password, email } = req.body
        const userExists = await prismaClient.user.findFirst({
            where: { email: email },
        })
        if (userExists) return res.status(422).json({ error: 'User already Exists' })
        const hashPassword = await bcrypt.hash(password, 10)
        const newuser = await prismaClient.user.create({
            data: {
                name: username,
                email: email,
                hashedPassword: hashPassword,
                image: '',
                emailVerified: new Date()
            }
        });
        return res.status(201).json({
            user: newuser
        })
    } catch (e) {
        return res.status(400).json({ error: e })
    }
}
