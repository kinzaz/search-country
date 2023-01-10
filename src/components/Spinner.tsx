import MoonLoader from 'react-spinners/MoonLoader';
import { CSSProperties } from 'react';

const override: CSSProperties = {
	display: 'block',
	margin: '0 auto',
	borderColor: '#36d7b7',
	position: 'relative',
	top: '30vh',
};

const Spinner = (): JSX.Element => {
	return <MoonLoader color="#36d7b7" cssOverride={override} />;
};

export default Spinner;
