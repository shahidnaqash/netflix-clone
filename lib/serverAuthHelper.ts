import { NextApiRequest } from 'next';
import { getSession } from "next-auth/react";

import prismaClient from './prisma';

const serverAuthhelper = async (req: NextApiRequest) => {
    const session = await getSession({ req });
    if (!session?.user?.email) {
        throw new Error("Not Logedin");

    }
    const currentUser = await prismaClient.user.findUnique({
        where: {
            email: session.user.email
        }
    });
    if (!currentUser) {
        throw new Error("Not Logedin");
    }
    return { currentUser }
}
export default serverAuthhelper