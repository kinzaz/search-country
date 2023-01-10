import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Country, Extra, Status } from 'types';

export const loadCountryByName = createAsyncThunk<
	{ data: Country[] },
	string,
	{ extra: Extra }
>('@@details/load-country', (name, { extra: { client, api } }) => {
	return client.get(api.searchByCountry(name));
});

export const loadNeighborsByBorder = createAsyncThunk<
	{ data: Country[] },
	string[],
	{ extra: Extra }
>('@@details/load-neighbors', (borders, { extra: { client, api } }) => {
	return client.get(api.filterByCode(borders));
});

type DetailSlice = {
	currentCountry: Country | null;
	neighbors: string[];
	status: Status;
	error: string;
};

const initialState: DetailSlice = {
	status: 'pending',
	currentCountry: null,
	neighbors: [],
	error: '',
};

const detailsSlice = createSlice({
	name: '@@details',
	initialState,
	reducers: {
		clearDetails: () => initialState,
	},
	extraReducers: builder => {
		builder
			.addCase(loadCountryByName.pending, (state) => {
				state.status = 'pending';
				state.error = '';
			})
			.addCase(loadCountryByName.rejected, (state) => {
				state.status = 'rejected';
				state.error = 'Cannot load data';
			})
			.addCase(loadCountryByName.fulfilled, (state, action) => {
				state.status = 'fulfilled';
				state.currentCountry = action.payload.data[0];
			})
			.addCase(loadNeighborsByBorder.fulfilled, (state, action) => {
				state.neighbors = action.payload.data.map(country => country.name);
			});
	},
});

export const { clearDetails } = detailsSlice.actions;

export const detailsReducer = detailsSlice.reducer;
