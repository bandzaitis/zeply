import useSWR from 'swr';

export const useTop = () => {
	const { data, error, isLoading } = useSWR(`/api/top`);

	return { data, isLoading, error };
};
