import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Account } from 'src/services/http-services/accounts-service/models';
import { accountsService } from 'src/services/http-services/accounts-service/accounts.service';

export const useAccountStore = defineStore('account', () => {
  const currentAccount = ref<Account | null>(null);
  async function getAllAccounts() {
    return await accountsService.getAllAccounts();
  }
  async function getAccount(id: string) {
    const res = await accountsService.getAccount(id);
    currentAccount.value = res.data;
    return res;
  }
  return { getAllAccounts, getAccount, currentAccount };
});
