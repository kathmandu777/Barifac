import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getStoreToken } from './TokenStore';
import { SessionService } from 'services/SessionService';

export default class RestClient {
  constructor(private readonly token: string) {}

  async get<ResponseInterface>(path: string) {
    return await axios.get<ResponseInterface>(path, this.requestConfig);
  }

  async getFile(path: string): Promise<AxiosResponse<Blob>> {
    return await axios.get(path, {
      baseURL: process.env.API_ORIGIN,
      responseType: 'blob',
    });
  }

  async post<RequestInterface, ResponseInterface>(
    path: string,
    body: RequestInterface,
  ) {
    return await axios.post<ResponseInterface>(path, body, this.requestConfig);
  }

  async put<RequestInterface, ResponseInterface>(
    path: string,
    body: RequestInterface,
  ) {
    return await axios.put<ResponseInterface>(path, body, this.requestConfig);
  }

  async formPost<RequestInterface, ResponseInterface>(
    path: string,
    body: RequestInterface,
  ) {
    return await axios.post<ResponseInterface>(
      path,
      body,
      this.formRequestConfig,
    );
  }

  async formURLEncodedPost<ResponseInterface>(
    path: string,
    name: string,
    value: string,
  ) {
    const params = new URLSearchParams();
    params.append(name, value);

    return await axios.post<ResponseInterface>(
      path,
      params,
      this.formRequestConfig,
    );
  }

  async delete(path: string) {
    return await axios.delete(path, this.requestConfig);
  }

  private get requestConfig(): AxiosRequestConfig {
    return {
      baseURL: process.env.NEXT_PUBLIC_API_ORIGIN, //'https://api.barifac.tk/', //
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      withCredentials: false,
    };
  }

  private get formRequestConfig(): AxiosRequestConfig {
    return {
      baseURL: process.env.NEXT_PUBLIC_API_ORIGIN, //'https://api.barifac.tk/', //
      headers: {
        Authorization: this.token ? `Bearer ${this.token}` : 'null',
      },
      withCredentials: false,
    };
  }
}

export function authClient() {
  const session = SessionService.build(getStoreToken());
  if (!session) return null;
  return new RestClient(session.token);
}

export function noAuthClient() {
  return new RestClient('');
}
