import ReceiptIcon from '@mui/icons-material/Receipt';
import WalletIcon from '@mui/icons-material/Wallet';
import { Alert, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import { Search } from './top.type';

export interface UiSubscriptionListProps {
	searches: Search[];
}

export const UiTopList = ({ searches }: UiSubscriptionListProps) => {
	const router = useRouter();
	const handleListItemClick = (hash: string) => router.push(`/search/${hash}`);

	return searches.length ? (
		<List sx={{ m: 0, p: 0 }}>
			{searches.map(({ hash, isAddress, count }) => (
				<ListItem disablePadding key={hash} sx={{ m: 0, p: 0 }}>
					<ListItemButton onClick={() => handleListItemClick(hash)}>
						<ListItemIcon>{isAddress ? <WalletIcon /> : <ReceiptIcon />}</ListItemIcon>
						<ListItemText primary={hash} secondary={`Searched ${count} times`} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	) : (
		<Alert severity="info">No TOP entries yet. Please use search.</Alert>
	);
};
