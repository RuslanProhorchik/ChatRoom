import { User } from './user';

export interface CreateUserModel {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
  }
  
export interface LoginUserModel {
    Email: string;
    Password: string;
}

export interface DirectConversation {
  uid: string;
  users_uids: string[];
}

export interface IDirectConversationDisplay {
  conversation_uid: string;
  name: string;
  isActive: boolean;
}
