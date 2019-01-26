import { AxiosStatic } from 'axios';
import { IService } from '../service/types';
import { FLoggerLevelOutputFunction } from '../LoggingService';

interface BaseRequestOptions {
  url: string;
  headers?: { [key: string]: string };
}

export interface GetRequestOptions extends BaseRequestOptions {
  params?: { [key: string]: string | number | object };
}

export interface PostRequestOptions extends BaseRequestOptions {
  body?: any;
}

export interface RequestResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
}

export interface NetworkServiceConfiguration {
  log?: FLoggerLevelOutputFunction;
  client?: AxiosStatic;
}

export interface INetworkService extends IService<NetworkServiceConfiguration> {
  /**
   * Send a GET request.
   * @param options request options
   */
  get<T>(options: GetRequestOptions): Promise<RequestResponse<T>>;

  /**
   * Send a POST request.
   * @param options request options.
   */
  post<T>(options: PostRequestOptions): Promise<RequestResponse<T>>;

  /**
   * Send a DELETE request.
   * @param options request options.
   */
  delete<T>(options: GetRequestOptions): Promise<RequestResponse<T>>;
}
