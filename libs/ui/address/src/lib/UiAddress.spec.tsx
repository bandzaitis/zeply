import { render } from '@testing-library/react';
import { UiAddress } from './UiAddress';
import { Address } from './address.type';

jest.mock('next/router', () => require('next-router-mock'));

describe('UiAddress', () => {
	const address: Address = {
		hash: '',
		countTransactionConfirmed: 0,
		totalReceived: 0,
		totalSpent: 0,
		totalUnspent: 0,
		currentBalance: 0,
	};

	it('should render successfully', () => {
		const { baseElement } = render(<UiAddress address={address} />);
		expect(baseElement).toBeTruthy();
	});
});
