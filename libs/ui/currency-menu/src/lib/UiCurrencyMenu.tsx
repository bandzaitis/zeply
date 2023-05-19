import styled from '@emotion/styled';
import { Box, Button, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { Currency } from '@zeply/currency';
import { UiCurrencyIcon } from '@zeply/ui/currency-icon';
import { MouseEvent, useState } from 'react';

export interface UiCurrencyMenuProps {
	sx?: SxProps<Theme>;
	currencies: Currency[];
	currency: Currency;
	setCurrency: (value: Currency) => void;
}

const CurrencyMenu = ({ sx = [], currency, currencies, setCurrency }: UiCurrencyMenuProps) => {
	const [anchorElCurrency, setAnchorElCurrency] = useState<null | HTMLElement>(null);
	const isOpenMenuCurrency = Boolean(anchorElCurrency);

	const handleMenuOpenCurrency = (event: MouseEvent<HTMLElement>) => setAnchorElCurrency(event.currentTarget);
	const handleMenuCloseCurrency = () => setAnchorElCurrency(null);
	const handleMenuSelectCurrency = (currency: Currency) => {
		setCurrency(currency);
		handleMenuCloseCurrency();
	};

	return (
		<Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>
			<Button
				id="currency-menu-button"
				onClick={handleMenuOpenCurrency}
				color="inherit"
				startIcon={<UiCurrencyIcon currency={currency} />}
			>
				{currency}
			</Button>
			<Menu
				id="currency-menu"
				anchorEl={anchorElCurrency}
				open={isOpenMenuCurrency}
				onClose={handleMenuCloseCurrency}
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				transformOrigin={{ vertical: 'top', horizontal: 'left' }}
			>
				{currencies
					.filter((value) => value !== currency)
					.map((value) => (
						<MenuItem key={`currency-item-${value}`} onClick={() => handleMenuSelectCurrency(value)}>
							<ListItemIcon>{<UiCurrencyIcon currency={value} />}</ListItemIcon>
							<Typography variant="inherit">{value}</Typography>
						</MenuItem>
					))}
			</Menu>
		</Box>
	);
};

export const UiCurrencyMenu = styled(CurrencyMenu)();
