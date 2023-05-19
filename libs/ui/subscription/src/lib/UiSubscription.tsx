import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, CardContent, LinearProgress, Tab, Typography } from '@mui/material';
import { AppContextAction, useAppContext, useAppDispatchContext } from '@zeply/ui/context';
import { UiLayout } from '@zeply/ui/layout';
import { useSnackbar } from 'notistack';
import { SyntheticEvent } from 'react';
import { UiSubscriptionList } from './UiSubscriptionList';
import { useSubscriptions } from './hook/use-subscriptions';
import { Subscription } from './subscription.type';

export const UiSubscription = () => {
	const { tabSubscriptions } = useAppContext();
	const appDispatch = useAppDispatchContext();
	const { enqueueSnackbar } = useSnackbar();
	const { data, isLoading, error } = useSubscriptions();
	const handleChange = (event: SyntheticEvent, value: string) => appDispatch({ type: AppContextAction.SET_TAB_SUBSCRIPTIONS, value });

	if (isLoading || !data) {
		return (
			<UiLayout>
				<LinearProgress />
			</UiLayout>
		);
	}

	if (error) {
		enqueueSnackbar((error as { message: string })?.message || error, { variant: 'error' });
	}

	return (
		<Card>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					Subscriptions
				</Typography>
				<TabContext value={tabSubscriptions}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList onChange={handleChange}>
							<Tab label="Wallets" value="wallets" />
							<Tab label="Transactions" value="transactions" />
						</TabList>
					</Box>
					<TabPanel value="wallets">
						<UiSubscriptionList subscriptions={(data as Subscription[]).filter((subscription) => subscription.isAddress)} />
					</TabPanel>
					<TabPanel value="transactions">
						<UiSubscriptionList subscriptions={(data as Subscription[]).filter((subscription) => !subscription.isAddress)} />
					</TabPanel>
				</TabContext>
			</CardContent>
		</Card>
	);
};
