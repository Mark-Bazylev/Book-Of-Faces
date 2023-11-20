import {httpService} from "src/services/api-services/http.service";


export interface authTokenData{
  userId:string,
  iat:number,
  exp:number,

}
export const AUTH_TOKEN_KEY = 'authToken';

class AuthService{
  constructor() {
    httpService.setAuthToken(this.getAuthToken());
  }
  getAuthToken(){
    return window.localStorage.getItem(AUTH_TOKEN_KEY);
  }
  setAuthToken(token:string|null){
    if(token) {
      window.localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
    else{
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
    }
    httpService.setAuthToken(token)
  }
  async getUserEmail(){
    const res=await httpService.get('auth/email')
    return res
  }
  async updateUserEmail(newEmail:string){
    const res=await httpService.patch('auth/email', {newEmail})
    return res
  }
  async changePassword(data:any){
    const res= await httpService.patch('auth/password',data)
    return res
  }
  async login(data:any) {
    const res = await httpService.post('auth/login', data);
    this.setAuthToken(res.data.token);
    return res;
  }
  async register(data:any) {
    const res = await httpService.post('auth/register', data);
    console.log(res)
    this.setAuthToken(res.data.token);
    return res;
  }

  async deleteAccount(){
    const res=await httpService.delete('auth/delete')
    return res;
  }
}

export const authService = new AuthService();
