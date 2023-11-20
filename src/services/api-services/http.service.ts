import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { Notify } from 'quasar';

class HttpService {
  private service: AxiosInstance;
  constructor() {
    this.service = axios.create({
      baseURL: process.env.BASE_URL,
    });
    this.service.interceptors.response.use(undefined, this.errorsInterceptor);
  }
  errorsInterceptor(...error: any) {
    Notify.create({
      type: 'negative',
      textColor: 'white',
      message: error[0].response.data.msg || 'Something went wrong',
      icon: 'warning',
      timeout: 3000,
      progress: true,
    });
  }
  setAuthToken(token: string | null) {
    const common = this.service.defaults.headers.common;
    common.Authorization = token ? `Bearer ${token}` : '';
  }

  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.service.get<T>(url, config);
  }
  post<T = any>(
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
  patch<T=any>(
    url: string,
    data?: {
      newEmail?: string;
      currentPassword?: string;
      newPassword?: string;
      newName?:string
      newCoverUrl?:string,
      newAvatarUrl?:string,
    },
    config?: AxiosRequestConfig
  ) {
    return this.service.patch(url, data, config);
  }
  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.service.delete<T>(url, config);
  }
}
export const httpService = new HttpService();
