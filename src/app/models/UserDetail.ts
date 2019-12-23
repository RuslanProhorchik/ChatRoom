import { IUserDetail } from './IUserDetail';
import { CreateUserModel } from './CreateUserModel';

export class UserDetail implements IUserDetail{
    uid: string;
    email: string;        
    firstName: string;
    lastName: string;
    displayName: string;

    constructor(user: CreateUserModel) {
        this.firstName = user.FirstName;
        this.lastName = user.LastName;
        this.email = user.Email;
        this.displayName = this.firstName + ' ' + this.lastName;
    }
}