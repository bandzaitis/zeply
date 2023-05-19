import useSWR from 'swr';

export const useSubscriptions = () => {
	const { data, error, isLoading } = useSWR(`/api/subscriptions`);

	return { data, isLoading, error };
};
