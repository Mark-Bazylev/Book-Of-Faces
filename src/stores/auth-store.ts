import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  authService,
  authTokenData,
} from 'src/services/api-services/auth.service';
import jwt_decode from 'jwt-decode';

export const useAuthStore = defineStore('auth', () => {
  const tokenData = ref<authTokenData | null>(null);
  const userEmail = ref('');
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
    tokenData.value = null;
  }
  function isLoggedIn() {
    return !!tokenData.value && tokenData.value.exp * 1000 > Date.now();
  }
  async function getUserEmail() {
    try {
      const res = await authService.getUserEmail();
      userEmail.value = res.data.email;
    } catch (error) {
      userEmail.value = '';
    }
  }
  async function updateUserEmail(newEmail: string) {
    return await authService.updateUserEmail(newEmail);
  }
  async function changePassword(data: any) {
    return await authService.changePassword(data);
  }
  async function login(data: any) {
    console.log('login submitted');
    const res = await authService.login(data);
    setAuthData();
    return res;
  }
  async function register(data: object) {
    console.log('register submitted');
    await authService.register(data);
    setAuthData();
  }

  async function deleteAccount() {
    return await authService.deleteAccount();
  }

  return {
    tokenData,
    userEmail,
    login,
    register,
    isLoggedIn,
    removeAuthData,
    getUserEmail,
    updateUserEmail,
    changePassword,
    deleteAccount,
  };
});
