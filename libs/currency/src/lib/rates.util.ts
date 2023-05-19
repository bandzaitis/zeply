import { API_URL, fetchData } from '@zeply/api';
import { CURRENCIES } from './currency.const';
import { Rates } from './currency.type';

const normalizeRates = (data: Record<string, { last: number }>): Rates =>
	CURRENCIES.reduce((acc, cur) => {
		acc[cur] = data[cur]?.last ?? 1;

		return acc;
	}, {} as Rates);

export const fetchRatesData = async () => {
	const data = (await fetchData(API_URL.RATES)) as Record<string, { last: number }>;

	return normalizeRates(data);
};
