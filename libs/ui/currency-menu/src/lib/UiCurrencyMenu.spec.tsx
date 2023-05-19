import { render } from '@testing-library/react';
import { UiCurrencyMenu } from './UiCurrencyMenu';
import { Currency } from '@zeply/currency';

describe('UiCurrencyMenu', () => {
	const currency = Currency.EUR;
	const currencies = [Currency.EUR, Currency.USD, Currency.BTC];
	const setCurrency = () => ({});

	it('should render successfully', () => {
		const { baseElement } = render(<UiCurrencyMenu currency={currency} currencies={currencies} setCurrency={setCurrency} />);

		expect(baseElement).toBeTruthy();
	});
});
