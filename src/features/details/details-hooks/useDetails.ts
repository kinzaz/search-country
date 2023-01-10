import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { infoDetails } from '../details-selector';
import { clearDetails, loadCountryByName } from '../details.slice';

export const useDetails = (name: string) => {
	const dispatch = useAppDispatch();
	const details = useSelector(infoDetails);

	useEffect(() => {
		dispatch(loadCountryByName(name));

		return () => {
			dispatch(clearDetails());
		};
	}, [name, dispatch]);

	return details;
};
