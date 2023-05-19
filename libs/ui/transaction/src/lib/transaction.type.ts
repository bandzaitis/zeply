export type Transaction = {
	hash: string;
	receivedAt: Date;
	isConfirmed: boolean;
	size: number;
	numberOfConfirmations: number;
	totalInput: number;
	totalOutput: number;
	totalFees: number;
	isSubscribed?: boolean;
};
