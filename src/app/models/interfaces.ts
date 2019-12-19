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
  user_name: string;
  user_uid: string;
  isActive: boolean;
}

export interface StoredConversation {
  uid: string;
  message_id: string;
  users_uid: string[];
}
