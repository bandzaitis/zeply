import { AppBar, Box, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { CURRENCIES, Currency, isValidBtcHash } from '@zeply/currency';
import { AppContextAction, useAppContext, useAppDispatchContext } from '@zeply/ui/context';
import { UiCurrencyMenu } from '@zeply/ui/currency-menu';
import { UiSearch } from '@zeply/ui/search';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { ReactNode } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export interface UiLayoutProps {
	children: ReactNode;
}

export const UiLayout = ({ children }: UiLayoutProps) => {
	const router = useRouter();
	const { currency, searchTerm, hasBack } = useAppContext();
	const appDispatch = useAppDispatchContext();
	const { enqueueSnackbar } = useSnackbar();

	const setCurrency = (value: Currency) => appDispatch({ type: AppContextAction.SET_CURRENCY, value });
	const setSearchTerm = (value: string | null) => appDispatch({ type: AppContextAction.SET_SEARCH_TERM, value });

	const onBack = () => router.back();
	const onSearch = () => {
		if (String(searchTerm) === '') {
			return;
		}

		if (!isValidBtcHash(String(searchTerm))) {
			return enqueueSnackbar('Please enter a valid BTC address or transaction hash', { variant: 'error' });
		}

		setSearchTerm('');

		router.push(`/search/${searchTerm}`);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar position="absolute">
				<Toolbar>
					{hasBack && (
						<IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }} onClick={onBack}>
							<KeyboardArrowLeftIcon />
						</IconButton>
					)}
					<Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
						Zeply BTC
					</Typography>
					<UiSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={onSearch} />
					<UiCurrencyMenu currencies={CURRENCIES} currency={currency} setCurrency={setCurrency} sx={{ ml: 2 }} />
				</Toolbar>
			</AppBar>
			<Box
				component="main"
				sx={{
					backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
					flexGrow: 1,
					height: '100vh',
					overflow: 'auto',
				}}
			>
				<Toolbar />
				<Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
					<Grid container spacing={3}>
						{children}
					</Grid>
				</Container>
			</Box>
		</Box>
	);
};
