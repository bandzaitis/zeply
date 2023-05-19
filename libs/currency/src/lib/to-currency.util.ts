export const toCurrency = (btcAmount: number, rate: number) => Number((btcAmount * rate).toFixed(2));
