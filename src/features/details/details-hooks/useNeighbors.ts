import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { selectNeighbors } from '../details-selector';
import { loadNeighborsByBorder } from '../details.slice';

export const useNeighbors = (borders: string[] = []) => {
	const dispatch = useAppDispatch();
	const neighbors = useSelector(selectNeighbors);

	useEffect(() => {
		if (borders.length) {
			dispatch(loadNeighborsByBorder(borders));
		}
	}, [borders, dispatch]);

	return neighbors;
};
