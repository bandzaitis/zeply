import { Button, Card, CardActions, CardContent, CardHeader, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useAppContext, useCurrencyRate } from '@zeply/ui/context';
import { Address } from './address.type';
import { UiMoney } from '@zeply/ui/money';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

export interface UiTransactionProps {
	address: Address;
}

export const UiAddress = ({ address }: UiTransactionProps) => {
	const { currency } = useAppContext();
	const { enqueueSnackbar } = useSnackbar();
	const rate = useCurrencyRate(currency);
	const router = useRouter();

	const subscribe = async (hash: string): Promise<void> => {
		try {
			await fetch(`/api/subscriptions`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ hash }),
			});
			enqueueSnackbar('Successfully subscribed', { variant: 'success' });

			router.push('/');
		} catch (error) {
			enqueueSnackbar((error as { message: string })?.message, { variant: 'error' });
		}
	};
	const unSubscribe = async (hash: string): Promise<void> => {
		try {
			await fetch(`/api/subscriptions/${hash}`, { method: 'DELETE' });

			enqueueSnackbar('Successfully unsubscribed', { variant: 'success' });

			router.push('/');
		} catch (error) {
			enqueueSnackbar((error as { message: string })?.message, { variant: 'error' });
		}
	};

	return (
		<Card>
			<CardHeader title="BTC address search result"></CardHeader>
			<CardContent>
				<TableContainer sx={{ mt: 0 }}>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>Number of confirmed transactions</TableCell>
								<TableCell>{address.countTransactionConfirmed}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Total BTC received</TableCell>
								<TableCell>
									<UiMoney amount={address.totalReceived} currency={currency} rate={rate} />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Total BTC spent</TableCell>
								<TableCell>
									<UiMoney amount={address.totalSpent} currency={currency} rate={rate} />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Total BTC unspent</TableCell>
								<TableCell>
									<UiMoney amount={address.totalUnspent} currency={currency} rate={rate} />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Current address balance</TableCell>
								<TableCell>
									<UiMoney amount={address.currentBalance} currency={currency} rate={rate} />
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</CardContent>
			<CardActions>
				{address.isSubscribed ? (
					<Button color="primary" size="large" onClick={() => unSubscribe(address.hash)}>
						Unsubscribe
					</Button>
				) : (
					<Button color="primary" size="large" onClick={() => subscribe(address.hash)}>
						Subscribe
					</Button>
				)}
			</CardActions>
		</Card>
	);
};
