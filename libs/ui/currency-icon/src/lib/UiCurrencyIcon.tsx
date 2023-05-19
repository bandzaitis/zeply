import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import EuroIcon from '@mui/icons-material/Euro';
import { SxProps, Theme } from '@mui/material/styles';
import { Currency } from '@zeply/currency';

export interface UiCurrencyIconProps {
	sx?: SxProps<Theme>;
	currency: Currency;
}

export const UiCurrencyIcon = ({ sx = [], currency }: UiCurrencyIconProps) => {
	const sxIcon = [...(Array.isArray(sx) ? sx : [sx])];

	switch (currency) {
		case Currency.USD:
			return <AttachMoneyIcon sx={sxIcon} fontSize="inherit" />;
		case Currency.EUR:
			return <EuroIcon sx={sxIcon} fontSize="inherit" />;
		case Currency.BTC:
			return <CurrencyBitcoinIcon sx={sxIcon} fontSize="inherit" />;
		default:
			throw Error(`${currency} icon not implemented`);
	}
};
