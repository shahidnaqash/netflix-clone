import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '@/lib/prisma';
import serverAuthhelper from '@/lib/serverAuthHelper';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).end('');
    try {
        const { currentUser } = await serverAuthhelper(req);
        const totalMovies = await prismaClient.movie.count();
        const randomMovie = Math.floor(Math.random() * totalMovies)
        const movie = await prismaClient.movie.findMany({
            take: 1,
            skip: randomMovie
        })

        return res.status(200).json(movie[0])
    } catch (error) {
        console.log(error)
        return res.status(400).end('')
    }

}