import { prisma } from '@zeply/api';
import { isBtcWallet, isValidBtcHash } from '@zeply/currency';
import { Address, fetchAddressData } from '@zeply/ui/address';
import { Transaction, fetchTransactionData } from '@zeply/ui/transaction';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handleSearch(req: NextApiRequest, res: NextApiResponse<Address | Transaction | Record<string, string>>) {
	const hash = String(req.query.hash);

	if (!isValidBtcHash(hash)) {
		return res.status(400).json({});
	}

	const isAddress = isBtcWallet(hash);
	const data = isAddress ? await fetchAddressData(hash) : await fetchTransactionData(hash);

	await prisma.search.upsert({
		where: { hash },
		update: { count: { increment: 1 } },
		create: { hash, isAddress, count: 0 },
	});

	const subscription = await prisma.subscription.findUnique({ where: { hash } });

	return res.status(200).json({ ...data, isSubscribed: Boolean(subscription) });
}
