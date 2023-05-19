import { Grid } from '@mui/material';
import { AppContextAction, useAppDispatchContext } from '@zeply/ui/context';
import { UiLayout } from '@zeply/ui/layout';
import { UiSubscription } from '@zeply/ui/subscription';
import { UiTop } from '@zeply/ui/top';
import { useEffect } from 'react';

export default function Index() {
	const appDispatch = useAppDispatchContext();

	useEffect(() => appDispatch({ type: AppContextAction.SET_HAS_BACK, value: false }), [appDispatch]);

	return (
		<UiLayout>
			<Grid item xs={12} md={6}>
				<UiTop />
			</Grid>
			<Grid item xs={12} md={6}>
				<UiSubscription />
			</Grid>
		</UiLayout>
	);
}
