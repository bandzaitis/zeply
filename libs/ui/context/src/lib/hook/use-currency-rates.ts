import useSWR from 'swr';

export const useCurrencyRates = () => {
	const { data, error, isLoading } = useSWR(`/api/rates`);

	return { data, error, isLoading };
};
