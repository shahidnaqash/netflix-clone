import { NextApiRequest, NextApiResponse } from 'next'
import prismaClient from '@/lib/prisma'
import serverAuthhelper from '@/lib/serverAuthHelper'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).end();
        }

        const { currentUser } = await serverAuthhelper(req);

        const favoritedMovies = await prismaClient.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds,
                }
            }
        });

        return res.status(200).json(favoritedMovies);
    } catch (error) {
        console.log(error);
        return res.status(500).end();
    }
}