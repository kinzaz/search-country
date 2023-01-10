import { useAppDispatch } from 'store';
import { clearControls } from '../controls.slice';

export const useClean = () => {
	const dispatch = useAppDispatch();

	const cleanUp = () => dispatch(clearControls());

	return cleanUp;
};
