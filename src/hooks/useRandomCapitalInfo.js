import { useState, useEffect } from 'react';
import { fetchRandomCapitalInfo } from '../helperFunctions';

export function useRandomCapitalInfo() {
	const [rCInfo, setRCInfo] = useState({
		rC: '',
		rCNameCommon: '',
		rCNameOfficial: '',
		rCFlag: '',
		rCCapitalName: '',
		rCCapitalLat: '',
		rCCapitalLon: '',
	});

	const getCapitalInfo = async () => {
		try {
			const data = await fetchRandomCapitalInfo();
			setRCInfo(data);
		} catch (error) {
			console.error('Error fetching capital info:', error);
		}
	};

	useEffect(() => {
		getCapitalInfo();
	}, []);

	return { rCInfo, getCapitalInfo };
}
