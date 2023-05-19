import { Button, Card, CardActions, CardContent, CardHeader, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useAppContext, useCurrencyRate } from '@zeply/ui/context';
import { UiMoney } from '@zeply/ui/money';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { Transaction } from './transaction.type';

export interface UiTransactionProps {
	transaction: Transaction;
}

export const UiTransaction = ({ transaction }: UiTransactionProps) => {
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
			<CardHeader title="BTC transaction search result"></CardHeader>
			<CardContent>
				<TableContainer sx={{ mt: 0 }}>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>Transaction hash</TableCell>
								<TableCell>{transaction.hash}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Received at</TableCell>
								<TableCell>{transaction.receivedAt.toLocaleString()}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Status</TableCell>
								<TableCell>{transaction.isConfirmed ? 'Confirmed' : 'Not confirmed'}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Size</TableCell>
								<TableCell>{transaction.size}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Number of confirmations</TableCell>
								<TableCell>{transaction.numberOfConfirmations}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Total BTC input</TableCell>
								<TableCell>
									<UiMoney amount={transaction.totalInput} currency={currency} rate={rate} />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Total BTC output</TableCell>
								<TableCell>
									<UiMoney amount={transaction.totalOutput} currency={currency} rate={rate} />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Total fees</TableCell>
								<TableCell>
									<UiMoney amount={transaction.totalFees} currency={currency} rate={rate} />
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</CardContent>
			<CardActions>
				{transaction.isSubscribed ? (
					<Button color="primary" size="large" onClick={() => unSubscribe(transaction.hash)}>
						Unsubscribe
					</Button>
				) : (
					<Button color="primary" size="large" onClick={() => subscribe(transaction.hash)}>
						Subscribe
					</Button>
				)}
			</CardActions>
		</Card>
	);
};
