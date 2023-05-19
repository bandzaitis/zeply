export type Address = {
	hash: string;
	countTransactionConfirmed: number;
	totalReceived: number;
	totalSpent: number;
	totalUnspent: number;
	currentBalance: number;
	isSubscribed?: boolean;
};
