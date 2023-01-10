import { useNavigate } from 'react-router-dom';
import { Card } from 'components/Card';
import { List } from 'components/List';
import { useCountries } from './countries-hooks/useCountries';
import Spinner from 'components/Spinner';

const CountryList = () => {
	const navigate = useNavigate();
	const [countries, { error, status }] = useCountries();

	return (
		<>
			{error && <h2>Can't fetch data</h2>}
			{status === 'pending' && <Spinner />}

			{status === 'fulfilled' && (
				<List>
					{countries.map(c => {
						const countryInfo = {
							img: c.flags.png,
							name: c.name,
							info: [
								{
									title: 'Population',
									description: c.population.toLocaleString(),
								},
								{
									title: 'Region',
									description: c.region,
								},
								{
									title: 'Capital',
									description: c.capital,
								},
							],
						};

						return (
							<Card
								key={c.name}
								onClick={() => void navigate(`/country/${c.name}`)}
								{...countryInfo}
							/>
						);
					})}
				</List>
			)}
		</>
	);
};

export default CountryList;
