import React, { useEffect } from 'react';
import { Info } from './Info';
import { useDetails } from './details-hooks/useDetails';
import { NavigateFunction } from 'react-router-dom';
import Spinner from 'components/Spinner';

interface CountryDetailsProps {
	name?: string;
	navigate: NavigateFunction;
}

const CountryDetails = ({ name = '', navigate }: CountryDetailsProps) => {
	const { status, error, currentCountry } = useDetails(name);

	return (
		<>
			{status === 'pending' ? (
				<Spinner />
			) : (
				<>{currentCountry && <Info push={navigate} {...currentCountry} />}</>
			)}
			{error && <h2>{error}</h2>}
		</>
	);
};

export default CountryDetails;
