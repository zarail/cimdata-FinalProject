export async function fetchCapital(capital) {
	const response = await fetch(
		`https://restcountries.com/v3.1/capital/${capital}`
	);
	if (!response.ok) {
		throw new Error(
			'There was a problem finding the capital city. Please check your spelling and try again.'
		);
	}
	const data = await response.json();
	if (data && data.length > 0) {
		for (const country of data) {
			if (
				country.capital &&
				country.capital[0].toLowerCase() === capital.toLowerCase()
			) {
				return {
					countryName: data[0].name.common,
					capitalName: data[0].capital[0],
					capitalLat: data[0].capitalInfo.latlng[0],
					capitalLon: data[0].capitalInfo.latlng[1],
					flag: data[0].flag,
				};
			}
		}
	}
	throw new Error('The capital city was not found. Please try again.');
}

export async function fetchRandomCapitalInfo() {
	const response = await fetch('https://restcountries.com/v3.1/all');
	if (!response.ok) {
		throw new Error('There was a problem fetching the data');
	}
	const data = await response.json();
	const countriesWithCapitals = data.filter(
		(country) => country.capital && country.capital.length > 0
	);
	const randomIndex = Math.floor(Math.random() * countriesWithCapitals.length);
	const rC = countriesWithCapitals[randomIndex];

	return {
		rC: rC.name,
		rCNameCommon: rC.name.common,
		rCNameOfficial: rC.name.official,
		rCFlag: rC.flag,
		rCCapitalName: rC.capital[0],
		rCCapitalLat: rC.capitalInfo.latlng[0],
		rCCapitalLon: rC.capitalInfo.latlng[1],
	};
}

export const capitalizeWords = (str) => {
	return str
		.split(' ')
		.map((word) => {
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		})
		.join(' ');
};

function toRadians(degrees) {
	return degrees * (Math.PI / 180);
}

export function distanceCalculator(lat1, lon1, lat2, lon2) {
	const R = 6371;
	const φ1 = toRadians(lat1);
	const φ2 = toRadians(lat2);
	const Δφ = toRadians(lat2 - lat1);
	const Δλ = toRadians(lon2 - lon1);

	const a =
		Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
		Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	const distance = R * c;

	return distance;
}
