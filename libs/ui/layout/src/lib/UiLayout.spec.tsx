import { render } from '@testing-library/react';
import { UiLayout } from './UiLayout';

jest.mock('next/router', () => require('next-router-mock'));

describe('UiLayout', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<UiLayout children={[]} />);
		expect(baseElement).toBeTruthy();
	});
});
