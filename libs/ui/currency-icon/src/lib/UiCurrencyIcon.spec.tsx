import { render } from '@testing-library/react';
import { UiCurrencyIcon } from './UiCurrencyIcon';
import { Currency } from '@zeply/currency';

describe('UiCurrencyIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<UiCurrencyIcon currency={Currency.BTC} />);
		expect(baseElement).toBeTruthy();
	});
});
