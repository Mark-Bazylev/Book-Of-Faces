import { defineStore } from 'pinia';
import { httpService } from 'src/services/http-services/http.service';
import { ref } from 'vue';
import {
  AUTH_TOKEN_KEY,
  authService,
  authTokenData,
} from 'src/services/http-services/auth.service';
import jwt_decode from 'jwt-decode';
export const useAuthStore = defineStore('auth', () => {
  const tokenData = ref<authTokenData | null>(null);
  setAuthData();
  function setAuthData() {
    const token = authService.getAuthToken();
    if (token) {
      try {
        tokenData.value = jwt_decode(token);
      } catch (error) {
        tokenData.value = null;
      }
    } else {
      tokenData.value = null;
    }
  }
  function removeAuthData() {
     authService.setAuthToken(null);
     tokenData.value=null;
  }
  function isLoggedIn() {
    return !!tokenData.value && tokenData.value.exp * 1000 > Date.now();
  }
  async function login(data: object) {
    console.log('login submitted');
    const res = await authService.login(data);
    console.log(res);
    setAuthData();
  }
  async function register(data: object) {
    console.log('register submitted');
    const res = await authService.register(data);
    console.log(res);
    setAuthData();
  }

  return { login, register, tokenData, isLoggedIn ,removeAuthData};
});
