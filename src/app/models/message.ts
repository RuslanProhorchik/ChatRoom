import { Timestamp } from '@firebase/firestore-types';

export interface Message {    
    id?: string;
    text?: string;
    createdAt?: Date;
}