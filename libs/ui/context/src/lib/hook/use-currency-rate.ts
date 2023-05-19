import { Currency } from '@zeply/currency';
import { useCurrencyRates } from './use-currency-rates';

export const useCurrencyRate = (currency: Currency): number => {
	const { data, error, isLoading } = useCurrencyRates();

	return error || isLoading ? 1 : (data && data[currency]) ?? 1;
};
