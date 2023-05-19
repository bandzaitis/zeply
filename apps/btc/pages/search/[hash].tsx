import { Grid, LinearProgress } from '@mui/material';
import { isBtcTransaction } from '@zeply/currency';
import { UiAddress } from '@zeply/ui/address';
import { AppContextAction, useAppDispatchContext } from '@zeply/ui/context';
import { UiLayout } from '@zeply/ui/layout';
import { useSearch } from '@zeply/ui/search';
import { UiTransaction } from '@zeply/ui/transaction';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

export default function Search() {
	const { enqueueSnackbar } = useSnackbar();
	const appDispatch = useAppDispatchContext();

	const {
		query: { hash },
	} = useRouter();
	const { data, error, isLoading } = useSearch(hash);

	useEffect(() => appDispatch({ type: AppContextAction.SET_HAS_BACK, value: true }), [appDispatch]);

	if (!hash || !data || isLoading) {
		return (
			<UiLayout>
				<LinearProgress />
			</UiLayout>
		);
	}

	if (error) {
		enqueueSnackbar(error, { variant: 'error' });
	}

	return (
		<UiLayout>
			<Grid item xs={12}>
				{hash && isBtcTransaction(String(hash)) ? <UiTransaction transaction={data} /> : <UiAddress address={data} />}
			</Grid>
		</UiLayout>
	);
}
