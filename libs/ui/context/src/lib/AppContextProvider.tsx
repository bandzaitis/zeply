import { Currency, Rates } from '@zeply/currency';
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react';
import { AppContextAction } from './enum/app-context-action.enum';

export type AppStateType = {
	currency: Currency;
	rates: Rates;
	searchTerm: string;
	hasBack: boolean;
	tabSubscriptions: string;
	tabTop: string;
};
export type AppActionType = { type: string; value: unknown };
export type AppDispatchContextType = Dispatch<AppActionType>;

const initialState: AppStateType = {
	currency: Currency.EUR,
	rates: {} as Rates,
	searchTerm: '',
	hasBack: false,
	tabSubscriptions: 'wallets',
	tabTop: 'wallets',
};

export const AppContext = createContext<AppStateType>(initialState);
export const AppDispatchContext = createContext<AppDispatchContextType>(() => ({}));

export const useAppContext = () => useContext(AppContext);
export const useAppDispatchContext = () => useContext(AppDispatchContext);

const reducer = (state: AppStateType = initialState, { type, value }: AppActionType): AppStateType => {
	switch (type) {
		case AppContextAction.SET_CURRENCY:
			return { ...state, currency: value as Currency };
		case AppContextAction.SET_RATES:
			return { ...state, rates: value as Rates };
		case AppContextAction.SET_SEARCH_TERM:
			return { ...state, searchTerm: String(value) };
		case AppContextAction.SET_HAS_BACK:
			return { ...state, hasBack: Boolean(value) };
		case AppContextAction.SET_TAB_TOP:
			return { ...state, tabTop: String(value) };
		case AppContextAction.SET_TAB_SUBSCRIPTIONS:
			return { ...state, tabSubscriptions: String(value) };
		default:
			throw Error(`action ${type} not implemented`);
	}
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
	const [appState, appDispatch] = useReducer(reducer, initialState);

	return (
		<AppContext.Provider value={appState}>
			<AppDispatchContext.Provider value={appDispatch}>{children}</AppDispatchContext.Provider>
		</AppContext.Provider>
	);
};
