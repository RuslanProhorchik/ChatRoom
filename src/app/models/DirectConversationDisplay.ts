import { IDirectConversationDisplay } from "./interfaces";

export class DirectConversationDisplay implements IDirectConversationDisplay{
    user_name: string;
    user_uid: string;
    conversation_uid: string;    
    name: string;
    isActive: boolean;    
}