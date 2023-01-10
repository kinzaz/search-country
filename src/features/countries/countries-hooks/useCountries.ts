import { selectControls } from 'features/controls/controls-selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { Country } from 'types';
import {
	selectCountriesInfo,
	selectVisibleCountries,
} from '../countries-selectors';
import { loadCountries } from '../countries.slice';

export const useCountries = (): [
	Country[],
	ReturnType<typeof selectCountriesInfo>
] => {
	const dispatch = useAppDispatch();
	const controls = useSelector(selectControls);
	const countries = useSelector((state: RootState) =>
		selectVisibleCountries(state, controls)
	);
	const { status, error, quantity } = useSelector(selectCountriesInfo);

	useEffect(() => {
		if (!quantity) {
			dispatch(loadCountries());
		}
	}, [dispatch, quantity]);

	return [countries, { status, error, quantity, countries }];
};
