export interface IDirectConversationDisplay {
    messages_uid: string;    
    user_uid: string;    
  }

export class DirectConversationDisplay implements IDirectConversationDisplay{
    user_uid: string;
    messages_uid: string;        
}