import { prisma } from '@zeply/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handleSubscription(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'DELETE') {
		const hash = String(req.query.hash);

		const subscription = await prisma.subscription.delete({ where: { hash } });

		return res.status(200).json(subscription);
	}
}
