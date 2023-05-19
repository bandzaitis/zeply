import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, CardContent, LinearProgress, Tab, Typography } from '@mui/material';
import { AppContextAction, useAppContext, useAppDispatchContext } from '@zeply/ui/context';
import { UiLayout } from '@zeply/ui/layout';
import { useSnackbar } from 'notistack';
import { SyntheticEvent } from 'react';
import { UiTopList } from './UiTopList';
import { useTop } from './hook/use-top';
import { Search } from './top.type';

export const UiTop = () => {
	const { tabTop } = useAppContext();
	const appDispatch = useAppDispatchContext();
	const { enqueueSnackbar } = useSnackbar();
	const { data, isLoading, error } = useTop();
	const handleChange = (event: SyntheticEvent, value: string) => appDispatch({ type: AppContextAction.SET_TAB_TOP, value });

	if (isLoading) {
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
					TOP 5
				</Typography>
				<TabContext value={tabTop}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList onChange={handleChange}>
							<Tab label="Wallets" value="wallets" />
							<Tab label="Transactions" value="transactions" />
						</TabList>
					</Box>
					<TabPanel value="wallets">
						<UiTopList searches={((data as Search[]) || []).filter((subscription) => subscription.isAddress)} />
					</TabPanel>
					<TabPanel value="transactions">
						<UiTopList searches={((data as Search[]) || []).filter((subscription) => !subscription.isAddress)} />
					</TabPanel>
				</TabContext>
			</CardContent>
		</Card>
	);
};
