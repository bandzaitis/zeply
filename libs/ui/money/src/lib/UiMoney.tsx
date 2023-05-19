import { Stack, Typography } from '@mui/material';
import { Currency, toCurrency } from '@zeply/currency';
import { UiCurrencyIcon } from '@zeply/ui/currency-icon';

export interface UiMoneyProps {
	amount: number;
	currency: Currency;
	rate: number;
}

export const UiMoney = ({ amount, currency, rate }: UiMoneyProps) => (
	<Stack>
		<Typography variant="inherit" color="primary">
			{amount} <UiCurrencyIcon currency={Currency.BTC} />
		</Typography>
		{currency !== Currency.BTC && (
			<Typography variant="inherit" color="secondary">
				{toCurrency(amount, rate)} <UiCurrencyIcon currency={currency} />
			</Typography>
		)}
	</Stack>
);
