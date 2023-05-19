import { render } from '@testing-library/react';
import { UiSubscription } from './UiSubscription';

jest.mock('next/router', () => require('next-router-mock'));

describe('UiSubscription', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<UiSubscription />);
		expect(baseElement).toBeTruthy();
	});
});
