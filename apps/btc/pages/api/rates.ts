import { fetchRatesData } from '@zeply/currency';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handleRates(req: NextApiRequest, res: NextApiResponse) {
	const data = await fetchRatesData();

	return res.status(200).json(data);
}
