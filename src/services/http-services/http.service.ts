import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class HttpService {
  private service: AxiosInstance;
  constructor() {
    this.service = axios.create({
      baseURL: process.env.BASE_URL,
    });
  }
  setAuthToken(token: string | null) {
    const common = this.service.defaults.headers.common;
    common.Authorization = token ? `Bearer ${token}` : '';
  }

  get<T=any>(url: string, config?: AxiosRequestConfig) {
    return this.service.get<T>(url, config);
  }
  post<T=any>(
    url: string,
    data?: {
      content?: string;
      commentedIn?: string;
      commentId?: string;
      postId?: string;
      requestedUserId?: string;
      acceptedUserId?: string;
    },
    config?: AxiosRequestConfig
  ) {
    return this.service.post<T>(url, data, config);
  }
  // delete<T>(url: string, config?: AxiosRequestConfig) {
  //   return this.service.delete<T>(url, config);
  // }
}
export const httpService = new HttpService();
