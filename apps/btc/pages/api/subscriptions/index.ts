import { prisma } from '@zeply/api';
import { isBtcWallet, isValidBtcHash } from '@zeply/currency';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handleSubscriptions(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const hash = String(req.body.hash);

		if (!isValidBtcHash(hash)) {
			return res.status(400).json({});
		}

		const isAddress = isBtcWallet(hash);
		const subscription = await prisma.subscription.create({ data: { hash, isAddress } });

		return res.status(201).json(subscription);
	}

	const data = await prisma.subscription.findMany();

	return res.status(200).json(data);
}
