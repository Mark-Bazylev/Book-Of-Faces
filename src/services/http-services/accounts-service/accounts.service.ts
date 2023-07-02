import { httpService } from 'src/services/http-services/http.service';
import { Account } from 'src/services/http-services/accounts-service/models';

class AccountsService {
  getAllAccounts() {
    return httpService.get('accounts');
  }
  getAccount(id: string) {
    return httpService.get<Account>(`accounts/${id}`);
  }
}

export const accountsService = new AccountsService();
