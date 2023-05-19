import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { Alert, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import { Subscription } from './subscription.type';

export interface UiSubscriptionListProps {
	subscriptions: Subscription[];
}

export const UiSubscriptionList = ({ subscriptions }: UiSubscriptionListProps) => {
	const router = useRouter();
	const handleListItemClick = (hash: string) => router.push(`/search/${hash}`);

	return subscriptions.length ? (
		<List sx={{ m: 0, p: 0 }}>
			{subscriptions.map(({ hash }) => (
				<ListItem disablePadding key={hash} sx={{ m: 0, p: 0 }}>
					<ListItemButton onClick={() => handleListItemClick(hash)}>
						<ListItemIcon>
							<LoyaltyIcon />
						</ListItemIcon>
						<ListItemText primary={hash} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	) : (
		<Alert severity="info">No subscriptions found. Please use search and subscribe.</Alert>
	);
};
