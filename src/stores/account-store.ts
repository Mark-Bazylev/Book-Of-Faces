import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { Account } from 'src/services/api-services/accounts-service/models';
import { accountsService } from 'src/services/api-services/accounts-service/accounts.service';
import { useAuthStore } from 'stores/auth-store';
import { AccountsMap } from 'src/services/api-services/friends-service/models';

const { tokenData } = storeToRefs(useAuthStore());
export const useAccountStore = defineStore('account', () => {
  const currentAccount = ref<Account | null>(null);
  const accountsMap = ref<AccountsMap | null>({});

  function addAccounts(newAccounts: AccountsMap) {
    accountsMap.value = { ...accountsMap.value, ...newAccounts };
  }
  async function getAllAccounts() {
    return await accountsService.getAllAccounts();
  }
  async function getMyAccount() {
    const res = await accountsService.getAccount(tokenData.value?.userId || '');
    console.log(res.data);
    currentAccount.value = res.data;
    return res.data;
  }
  async function getAccount(id: string) {
    const res = await accountsService.getAccount(id);
    console.log(res.data);
    return res.data;
  }
  async function editAccount(data: any) {
    return await accountsService.editAccount(data);
  }
  return {
    addAccounts,
    getAllAccounts,
    getAccount,
    getMyAccount,
    editAccount,
    currentAccount,
    accountsMap,
  };
});
