import axios, { AxiosStatic } from 'axios';

import { EServiceName } from '../service/enums';
import { AbstractService } from '../service/AbstractService';

import { LogLevel, LoggingService } from '../LoggingService';

import {
  INetworkService,
  GetRequestOptions,
  PostRequestOptions,
  RequestResponse,
  NetworkServiceConfiguration,
} from './types';

export class AxiosNetworkService
  extends AbstractService<NetworkServiceConfiguration>
  implements INetworkService {
  private client: AxiosStatic;

  constructor() {
    super(EServiceName.NetworkService, 'AxiosNetworkService');
  }

  public init = async (config: NetworkServiceConfiguration) => {
    this.client = config.client || axios;
    this.log = config.log || LoggingService.void;
    this.log(LogLevel.DEBUG)(`Network service initialised.`);
  };

  public get = async <T>(options: GetRequestOptions) => {
    const requestOptions: any = {};
    if (options.headers) requestOptions.headers = options.headers;
    if (options.params) requestOptions.params = options.params;
    this.log(LogLevel.SILLY)(`Sending GET to ${options.url}`);
    const result = await this.client.get<T>(options.url, requestOptions);
    return {
      data: result.data,
      status: result.status,
      statusText: result.statusText,
      headers: result.headers,
    } as RequestResponse<T>;
  };

  public post = async <T>(options: PostRequestOptions) => {
    const requestOptions: any = {};
    if (options.headers) requestOptions.headers = options.headers;
    this.log(LogLevel.SILLY)(`Sending POST to ${options.url}`);
    const result = await this.client.post<T>(
      options.url,
      options.body,
      requestOptions,
    );
    return {
      data: result.data,
      status: result.status,
      statusText: result.statusText,
      headers: result.headers,
    } as RequestResponse<T>;
  };

  public delete = async (options: GetRequestOptions) => {
    const requestOptions: any = {};
    if (options.headers) requestOptions.headers = options.headers;
    if (options.params) requestOptions.params = options.params;
    this.log(LogLevel.SILLY)(`Sending DELETE to ${options.url}`);
    const result = await this.client.delete(options.url, requestOptions);
    return {
      data: result.data,
      status: result.status,
      statusText: result.statusText,
      headers: result.headers,
    } as RequestResponse<any>;
  };
}
