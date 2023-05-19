import { toBtc } from '@zeply/currency';
import { Address } from './address.type';
import { fetchData, API_URL } from '@zeply/api';

const normalizeAddress = async (data: Record<string, unknown>): Promise<Address> => {
	const { address, n_tx, total_received, total_sent, final_balance } = data;
	const currentBalance = toBtc(Number(final_balance));

	return {
		hash: String(address),
		countTransactionConfirmed: Number(n_tx),
		totalReceived: toBtc(Number(total_received)),
		totalSpent: toBtc(Number(total_sent)),
		totalUnspent: currentBalance,
		currentBalance,
	};
};

export const fetchAddressData = async (hash: string) => {
	const data = await fetchData(`${API_URL.ADDRESS}/${hash}`);

	return normalizeAddress(data);
};
