import { IDirectConversationDisplay } from "./interfaces";

export class DirectConversationDisplay implements IDirectConversationDisplay{
    conversation_uid: string;    
    name: string;
    isActive: boolean;    
}