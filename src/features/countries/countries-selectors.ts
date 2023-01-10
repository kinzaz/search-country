import { RootState } from "store";

// selectors
export const selectCountriesInfo = (state: RootState) => ({
	status: state.countries.status,
	countries: state.countries.countries,
	error: state.countries.error,
	quantity: state.countries.countries.length,
});

export const selectAllCountries = (state: RootState) => state.countries.countries;

export const selectVisibleCountries = (state: RootState, { search = '', region = '' }) => {
	return state.countries.countries.filter(
		country =>
			country.name.toLowerCase().includes(search) &&
			country.region.includes(region)
	);
};
