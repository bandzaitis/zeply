import { render } from '@testing-library/react';
import { UiTransaction } from './UiTransaction';
import { Transaction } from './transaction.type';

jest.mock('next/router', () => require('next-router-mock'));

describe('UiTransaction', () => {
	const transaction: Transaction = {
		hash: '',
		receivedAt: new Date(),
		isConfirmed: false,
		size: 0,
		numberOfConfirmations: 0,
		totalInput: 0,
		totalOutput: 0,
		totalFees: 0,
	};

	it('should render successfully', () => {
		const { baseElement } = render(<UiTransaction transaction={transaction} />);
		expect(baseElement).toBeTruthy();
	});
});
