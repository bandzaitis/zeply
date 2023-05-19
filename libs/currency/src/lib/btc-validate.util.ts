const regexBtcWallet = new RegExp(/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/);
const regexBtcTransaction = new RegExp(/^[a-fA-F0-9]{64}$/);

export const isBtcWallet = (value: string) => regexBtcWallet.test(value);
export const isBtcTransaction = (value: string) => regexBtcTransaction.test(value);
export const isValidBtcHash = (value: string) => isBtcTransaction(value) || isBtcWallet(value);
