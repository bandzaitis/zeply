import useSWR from 'swr';

export const useSearch = (searchTerm: string | string[] | undefined) => {
	const { data, error, isLoading } = useSWR(searchTerm ? `/api/search/${searchTerm}` : null);

	return { data, isLoading, error };
};
