export const fetchData = async (url: string): Promise<Record<string, unknown>> => {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error('An error occurred while fetching the data.');
	}

	const json = await res.json();

	if (json.error) {
		throw new Error(json.message ?? `Invalid ${url} response`);
	}

	return json;
};
