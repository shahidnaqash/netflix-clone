import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prismaclient: PrismaClient }

const prismaClient = globalForPrisma.prismaclient || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaclient = prismaClient

export default prismaClient
