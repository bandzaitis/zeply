import { render } from '@testing-library/react';
import { UiMoney } from './UiMoney';
import { Currency } from '@zeply/currency';

describe('UiMoney', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<UiMoney amount={0} currency={Currency.BTC} rate={1} />);
		expect(baseElement).toBeTruthy();
	});
});
