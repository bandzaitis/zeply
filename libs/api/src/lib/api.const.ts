const BLOCKCHAIN_API_BASE = 'https://blockchain.info';

export const API_URL = Object.freeze({
	ADDRESS: `${BLOCKCHAIN_API_BASE}/rawaddr`,
	LATEST_BLOCK: `${BLOCKCHAIN_API_BASE}/latestblock`,
	TRANSACTION: `${BLOCKCHAIN_API_BASE}/rawtx`,
	RATES: `${BLOCKCHAIN_API_BASE}/ticker`,
});
