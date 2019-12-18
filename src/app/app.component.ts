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

  constructor(
  ) {
  }

}
