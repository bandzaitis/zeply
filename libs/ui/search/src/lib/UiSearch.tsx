import { InputBase } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const StyledUiSearch = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

export interface UiSearchProps {
	searchTerm: string | null;
	setSearchTerm: (value: string) => void;
	onSearch: () => void;
}

export const UiSearch = ({ searchTerm, setSearchTerm, onSearch }: UiSearchProps) => {
	const onKeyDownCapture = ({ code }: { code: string }) => {
		if (code.toLocaleLowerCase() === 'enter') {
			onSearch();
		}
	};

	return (
		<StyledUiSearch>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder="Search..."
				defaultValue={searchTerm}
				onChange={({ target: { value } }) => setSearchTerm(value)}
				onBlur={onSearch}
				onKeyDownCapture={onKeyDownCapture}
			/>
		</StyledUiSearch>
	);
};
