import { AxiosResponse } from 'axios';

// tslint:disable:only-arrow-functions
const mockResponse = function<T>(response: any) {
  return new Promise<AxiosResponse<T>>(resolve => resolve(response));
};

export default mockResponse;
