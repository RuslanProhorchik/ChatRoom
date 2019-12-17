import { Component } from '@angular/core';

import { AuthService } from './service/auth.service';
import { CreateUserModel } from './models/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChatRoom';
  errorMessage: string = '';

  constructor(
    public auth: AuthService
  ) {

    this.auth.eventAuthError$.subscribe(data => {
      this.errorMessage = data;
    });
  }

  public createUser() {
    let newUser: CreateUserModel = {
      Email: 'bbbb@gmail.com',
      Password: '1234567890',
      FirstName: 'Jon',
      LastName: 'Doe'
    };

    this.auth.createUser(newUser);
  }
}
