import { NextApiRequest, NextApiResponse } from 'next'
import prismaClient from '@/lib/prisma'
import serverAuthhelper from '@/lib/serverAuthHelper'

import { without } from 'lodash'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const { currentUser } = await serverAuthhelper(req);

            const { movieId } = req.body;

            const existingMovie = await prismaClient.movie.findUnique({
                where: {
                    id: movieId,
                }
            });

            if (!existingMovie) {
                throw new Error('Invalid ID');
            }

            const user = await prismaClient.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: {
                        push: movieId
                    }
                }
            });

            return res.status(200).json(user);
        }

        if (req.method === 'DELETE') {
            const { currentUser } = await serverAuthhelper(req);

            const { movieId } = req.body;

            const existingMovie = await prismaClient.movie.findUnique({
                where: {
                    id: movieId,
                }
            });

            if (!existingMovie) {
                throw new Error('Invalid ID');
            }

            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

            const updatedUser = await prismaClient.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: updatedFavoriteIds,
                }
            });

            return res.status(200).json(updatedUser);
        }

        return res.status(405).end();
    } catch (error) {
        console.log(error);

        return res.status(500).end();
    }
}