import { useSelector } from 'react-redux';
import throttle from 'lodash.throttle';
import { setSearch } from '../controls.slice';
import { selectSearch } from '../controls-selectors';
import { useAppDispatch } from 'store';
import { ChangeEventHandler } from 'react';

type onSearch = ChangeEventHandler<HTMLInputElement>;

export const useSearch = (): [string, onSearch] => {
	const dispatch = useAppDispatch();
	const search = useSelector(selectSearch);

	const handleSearch: onSearch = throttle(e =>
		dispatch(setSearch(e.target.value))
	);

	return [search, handleSearch];
};
