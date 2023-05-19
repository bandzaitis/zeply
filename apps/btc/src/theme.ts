import { red } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

export const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = responsiveFontSizes(
	createTheme({
		typography: {
			fontFamily: roboto.style.fontFamily,
		},
		components: {
			MuiUseMediaQuery: {
				defaultProps: {
					noSsr: true,
				},
			},
		},
	})
);

export default theme;
