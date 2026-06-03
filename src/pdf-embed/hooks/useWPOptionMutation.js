import { useState } from 'react';

const useWPOptionMutation = (key, { type: dataType = 'string' }, setStatus) => {
	const [isLoading, setIsLoading] = useState(false); 
	const [error, setError] = useState(null); 
	const [data, setData] = useState(null);

	const saveData = (data) => {
		setError(null);
		setIsLoading(true);
		setStatus('saving');

		try {
			const model = new wp.api.models.Settings({
				[key]: prepareData(data, 'saving'),
			});
			model.save().then((response) => {
				setData(prepareData(response[key], 'response'));
				setIsLoading(false);
				setStatus(null);
			});
		} catch (error) {
			setError(error?.message);
			setIsLoading(false);
			setStatus(null);
		}
	};

	const prepareData = (data, type) => {
		let newData = data;

		if (dataType === 'object') {
			// eslint-disable-next-line no-unused-vars
			const { isLoaded, ...restData } = data;
			newData = restData;
			try {
				newData = type === 'saving' ? JSON.stringify(data) : JSON.parse(data);
			} catch (error) {
				setError(error?.message);
			}
		}

		return newData;
	};

	return { data, saveData, isLoading, error };
};

export default useWPOptionMutation;