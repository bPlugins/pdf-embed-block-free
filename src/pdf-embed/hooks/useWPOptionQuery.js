import { useState, useEffect } from 'react';

const useWPOptionQuery = (key, status) => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);

	useEffect(() => {
		wp.api.loadPromise.then(() => {
			const settings = new wp.api.models.Settings();

			settings.fetch().then((response) => {
				setData(prepareData(response[key]));
				setIsLoading(false);
			});
		});
	}, [status]);

	const prepareData = (data) => {
		let newData = data;
		try {
			newData = JSON.parse(data);
			// eslint-disable-next-line no-empty
		} catch (error) { }

		return newData;
	};

	return { data, isLoading }
};
export default useWPOptionQuery;