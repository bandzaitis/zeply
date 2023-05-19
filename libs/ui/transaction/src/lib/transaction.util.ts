import { API_URL, fetchData } from '@zeply/api';
import { toBtc } from '@zeply/currency';
import * as moment from 'moment-timezone';
import { Transaction } from './transaction.type';

const getNumberOfConfirmations = async (blockHeight: number): Promise<number> => {
	const { height } = await fetchData(API_URL.LATEST_BLOCK);

	return Number(height) - blockHeight + 1;
};

const normalizeTransaction = async (data: Record<string, unknown>): Promise<Transaction> => {
	const { hash, fee, time, inputs, out, block_height, size } = data;

	const numberOfConfirmations = block_height ? await getNumberOfConfirmations(Number(block_height)) : 0;
	const totalInput = (inputs as { prev_out: { value: number } }[]).reduce((acc, { prev_out: { value } }) => acc + toBtc(value), 0);
	const totalOutput = (out as { value: number }[]).reduce((acc, { value }) => acc + toBtc(value), 0);

	return {
		hash: String(hash),
		receivedAt: moment.unix(Number(time)).toDate(),
		isConfirmed: Boolean(block_height),
		size: Number(size),
		numberOfConfirmations,
		totalInput,
		totalOutput,
		totalFees: toBtc(Number(fee)),
	};
};

export const fetchTransactionData = async (hash: string) => {
	const data = await fetchData(`${API_URL.TRANSACTION}/${hash}`);

	return normalizeTransaction(data);
};
