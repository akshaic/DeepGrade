import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() { // If using App Router (Next.js 13+)
    await prisma.$queryRaw`SELECT 1`;
    return Response.json({ status: 'Database kept alive' });
}

