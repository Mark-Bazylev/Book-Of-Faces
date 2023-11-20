import { httpService } from 'src/services/api-services/http.service';
import { Account } from 'src/services/api-services/accounts-service/models';

class AccountsService {
  getAllAccounts() {
    return httpService.get('accounts');
  }
  getAccount(id: string) {
    return httpService.get<Account>(`accounts/${id}`);
  }
  editAccount(data:any){
    return httpService.patch('accounts/edit',data)
  }
}

export const accountsService = new AccountsService();
