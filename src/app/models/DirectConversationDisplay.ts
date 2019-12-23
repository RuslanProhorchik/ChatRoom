export interface IDirectConversationDisplay {
    conversation_uid: string;
    user_name: string;
    user_uid: string;
    isActive: boolean;
  }

export class DirectConversationDisplay implements IDirectConversationDisplay{
    user_name: string;
    user_uid: string;
    conversation_uid: string;    
    name: string;
    isActive: boolean;    
}