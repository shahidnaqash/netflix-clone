import type { NextApiRequest, NextApiResponse } from 'next'
import serverAuthhelper from '@/lib/serverAuthHelper';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(400).end('')
    }
    try {
        const { currentUser } = await serverAuthhelper(req);
        return res.status(200).json(currentUser)
    } catch (error) {
        return res.status(400).end('')
    }
}