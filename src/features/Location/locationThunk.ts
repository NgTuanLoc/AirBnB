import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from '../../utils/axios';
import { ILocation } from '../../@types/Location';

const URL = '/api/locations';

const getLocationList = createAsyncThunk<ILocation[]>(
	'location/getLocationList',
	async (_, thunkAPI) => {
		try {
			const params = {
				method: 'GET',
				url: URL,
			};

			const response = await axiosInstance.request(params);
			return response.data;
		} catch (error: any) {
			console.log(error);

			return thunkAPI.rejectWithValue(error);
		}
	}
);

export { getLocationList };
