import { render } from '@testing-library/react';
import { UiTop } from './UiTop';

jest.mock('next/router', () => require('next-router-mock'));

describe('UiTop', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<UiTop />);
		expect(baseElement).toBeTruthy();
	});
});
