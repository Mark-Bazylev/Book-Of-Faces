import { Account } from 'src/services/api-services/accounts-service/models';

export interface FriendsData {
  sentRequests: [string];
  receivedRequests: [string];
  friendsList: [string];
  totalRequests: number;
  _id: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
export type AccountsMap = Record<string, Account>;
