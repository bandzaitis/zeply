import { prisma } from '@zeply/api';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handleSubscriptionsTop(req: NextApiRequest, res: NextApiResponse) {
	const [addresses, transactions] = await Promise.all([
		prisma.search.findMany({
			select: { hash: true, count: true, isAddress: true },
			where: { isAddress: true },
			orderBy: { count: 'desc' },
			take: 5,
		}),
		prisma.search.findMany({
			select: { hash: true, count: true, isAddress: true },
			where: { isAddress: false },
			orderBy: { count: 'desc' },
			take: 5,
		}),
	]);

	return res.status(200).json([...addresses, ...transactions]);
}
