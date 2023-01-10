import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Country, Extra, Status } from 'types';

export const loadCountries = createAsyncThunk<
	{ data: Country[] },
	undefined,
	{ state: { countries: CountrySlice }; extra: Extra; rejectValue: string }
>(
	'@@country/load-countries',
	async (_, { extra: { client, api }, rejectWithValue }) => {
		try {
			return client.get(api.ALL_COUNTRIES);
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Unknown error');
		}
	},
	{
		condition: (_, { getState }) => {
			const {
				countries: { status },
			} = getState();

			if (status === 'idle') {
				return false;
			}
		},
	}
);

type CountrySlice = {
	status: Status;
	countries: Country[];
	error: string | null;
};

const initialState: CountrySlice = {
	status: 'pending',
	countries: [],
	error: null,
};

const countrySlice = createSlice({
	name: '@@country',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(loadCountries.pending, (state, action) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(loadCountries.rejected, (state, action) => {
				state.error = action.payload || 'Cannot load data';
				state.status = 'rejected';
			})
			.addCase(loadCountries.fulfilled, (state, action) => {
				state.status = 'fulfilled';
				state.countries = action.payload.data;
			});
	},
});

export const countryReducer = countrySlice.reducer;
