import { render } from '@testing-library/react';
import { UiSearch } from './UiSearch';

describe('UiSearch', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<UiSearch searchTerm="test" setSearchTerm={() => ({})} onSearch={() => ({})} />);
		expect(baseElement).toBeTruthy();
	});
});
